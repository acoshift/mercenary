dev:
	node build/dev-server.js

.PHONY: build
build:
	node build/build.js

deploy: build
	firebase deploy

deploy-hosting: build
	firebase deploy --only hosting

deploy-database:
	firebase deploy --only database

deploy-functions:
	firebase deploy --only functions
