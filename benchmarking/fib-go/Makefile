default: 
	go test -bench=.

wasm:
	rm -rf fib.wasm
	GOOS=js GOARCH=wasm go build -o fib.wasm fib.go