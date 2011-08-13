VERSION=`cat version.txt`

build: version.txt data-graft.js
	mkdir -p dist
	cp data-graft.js dist/data-graft-$(VERSION).js
	./node_modules/uglify-js/bin/uglifyjs data-graft.js >dist/data-graft-$(VERSION).min.js

lint:
	./node_modules/jslint/bin/jslint.js data-graft.js
