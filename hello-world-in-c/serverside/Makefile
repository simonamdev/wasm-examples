build:
	emcc add.c -Os -s WASM=1 -s EXPORTED_FUNCTIONS='["_add"]' -o add.wasm

run:
	make build
	node server.js