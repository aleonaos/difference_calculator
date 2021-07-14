install:
		npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

jest:
	npx --node-arg --experimental-vm-modules jest

jest-watch:
	npx -n --experimental-vm-modules jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test