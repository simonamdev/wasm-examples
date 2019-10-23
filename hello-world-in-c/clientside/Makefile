default:
	make build
	make run

build:
	emcc add.c -o add.html -s EXPORTED_FUNCTIONS='["_add"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'

run:
	emrun --no_browser --port 8000 .