dev:
	node build/dev-server.js

.PHONY: build
build:
	node build/build.js

deploy: build
	firebase deploy
