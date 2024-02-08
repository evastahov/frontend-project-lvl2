install:
        npm install

lint:
        npm eslint .

test:
        npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
