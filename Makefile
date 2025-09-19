all: deploy

build:
	pxt build

deploy:
	pxt deploy

test:
	pxt test

serve:
	bash scripts/serve.sh
