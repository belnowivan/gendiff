install:
	npm install
build:
	rm -rf dist
	npm run build
test:
	npm test
lint:
	npx lint
publish:
	npm publish