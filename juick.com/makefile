all: everlasting-juick.user.js

clean:
	-rm *.user.js
	@echo Done cleanup

%.src.js: %.src.coffee
	@coffee -c $<

%.user.js: %.meta.js %.src.js
	@cat $^ > $@
