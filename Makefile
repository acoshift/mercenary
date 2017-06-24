dev:
	node build/dev-server.js

.PHONY: build
build:
	node build/build.js

deploy: build
	firebase deploy

.PHONY: hosting
hosting: build
	firebase deploy --only hosting

.PHONY: database
database:
	firebase deploy --only database

.PHONY: functions
functions:
	firebase deploy --only functions
