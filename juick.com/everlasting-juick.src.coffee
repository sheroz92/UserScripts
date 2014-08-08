###
# unsafeWindow goes away
###

window.addEventListener 'load', ->
  bottomScrollArea = 350
  doNotLoadNext = false
  # prevpage = window.location.href

  locWithoutHashSearch = (loc)->
    loc.protocol +
    '//' +
    loc.hostname +
    (if loc.port then ":" + loc.port else "") +
    loc.pathname # +
    # (loc.search || "")

  locWithoutHash = (loc)->
    loc.protocol +
    '//' +
    loc.hostname +
    (if loc.port then ":" + loc.port else "") +
    loc.pathname +
    (loc.search || "")


  addClickHandlers = (selector)->
    selector.click (e)->
      # e.preventDefault() # 4 debug
      elt = $(e.target)

      # console.log elt
      
      msg =  elt.closest 'article'
      pageid = msg.closest('div.everlasting-div').attr 'id'

      query = ''
      loadedfrom = pageid.match /loaded_from_(\d+)/
      if loadedfrom && +(loadedfrom[1])
        query = '?before=' + loadedfrom[1]

      msgy = msg.offset().top - $(window).scrollTop()
      
      where2return = locWithoutHashSearch(window.location) + query + "#" + msg.attr('data-mid') + '@' + msgy
      
      window.history.replaceState {}, window.title, where2return
      
      console.log "Will return to #{where2return}"

  prevpage = ''

  loadNextPage = ->
    doNotLoadNext = true

    oldprevpage = prevpage
    prevpage = $('p.page:last a').attr 'href'
    $('p.page:last').remove()

    if prevpage
      prevpagenum = prevpage.match(/.*\?before=(\d+).*/)[1]
      console.log "Loading new page: #{prevpage} (# #{prevpagenum})..."

      ###
      # $.ajax then parse HTML fails for Juick, so playing dirty.
      # Seems like browser sets innerHTML and then repairs markup,
      # so below approach works.
      ###
      $('body > section#content > div.everlasting-div:last').after "<div class=\"everlasting-div\" id=\"loaded_from_#{prevpagenum}\"></div>"
       
      $("div#loaded_from_#{prevpagenum}").load prevpage + ' #content', (data, status, req)->
        console.log "Status: #{status}"
        if status == 'success'
          $("div#loaded_from_#{prevpagenum} article.ads").remove()
          $("div#loaded_from_#{prevpagenum} div[id^=\"yandex_ad_\"]").remove()
          
          $("div#loaded_from_#{prevpagenum} article").unwrap()
          
          addClickHandlers $("div#loaded_from_#{prevpagenum} > article a")

          newer_pages = JSON.parse(sessionStorage["newer_pages"] || "{}")
          newer_pages[prevpagenum] = oldprevpage
          sessionStorage["newer_pages"] = JSON.stringify newer_pages          

          setTimeout ->
            doNotLoadNext = false
          , 500 # let it chill for a while
    else
      console.log "Likely reached the very bottom!.."

  # not on particular post page
  if not window.location.pathname.match /[a-zA-Z0-9]+\/[0-9]+/
    $ 'html body div#footer'
    . css
      position: "fixed"
      bottom: "5px"
      left: "0px"
      'background-color': "#f7f7f7"
      opacity: "0.8"
      padding: "5px"
      'border-radius': "5px"
    # and then add a bit before to give space to bottom of the section
    $ 'section#content'
    . after '<div style="height: 40px;"/>'

  # Anyway everybody uses ad blockers
  $('article.ads, div#footer-left,  div[id^="yandex_ad_"]').remove()

  initialbefore = window.location.search.match /\?before=(\d+).*/
  initialbefore = initialbefore && initialbefore[1] || "0"
  console.log "Initial before = #{initialbefore}"
 
  $('body section#content > article').wrapAll "<div class=\"everlasting-div\" id=\"loaded_from_#{initialbefore}\"></div>" 

  hash = window.location.hash.match /(\d+)@(\d+)/
  if hash
    scrollto = hash[1]
    scrolly  = hash[2]
    $(window).scrollTop($("article[data-mid=\"#{scrollto}\"]").offset().top - (+scrolly))

  addClickHandlers $("div#loaded_from_#{initialbefore} > article a")

  if search = window.location.search.match /\?before=(\d+)/
    if newer_page = JSON.parse(sessionStorage["newer_pages"] || "{}")[search[1]]
      $("section#content").prepend "<p><a href=\"#{newer_page}\">&lt;&lt; Newer</a></p>"

  $(window).scroll (evt)->  
    if !doNotLoadNext && $(window).innerHeight() + $(window).scrollTop() >= $("body").height() - bottomScrollArea
      loadNextPage()

  try
    console.log "Auto-update: " + GM_info.scriptWillUpdate
  catch e
    console.log "GM_info trouble"

  return
