dev:
	node build/dev-server.js

build:
	node build/build.js

deploy:
	firebase deploy
