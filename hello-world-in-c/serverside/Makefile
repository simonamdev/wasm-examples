build:
	emcc add.c -Os -s WASM=1 -s EXPORTED_FUNCTIONS='["_add"]' -o add.wasm

default:
	make build
	node server.js