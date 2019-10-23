package main

// Reference:
// https://www.aaron-powell.com/posts/2019-02-07-golang-wasm-4-response-to-javascript/

import (
	"syscall/js"
)

func main() {
	c := make(chan bool)
	js.Global().Set("fib", js.FuncOf(jsFib))
	js.Global().Set("fibIter", js.FuncOf(jsFibIter))
	<-c
}

// Fib - runs the fibonacci sequence, recursively
func Fib(n int) int {
	if n < 2 {
		return n
	}
	return Fib(n-1) + Fib(n-2)
}

func jsFib(this js.Value, inputs []js.Value) interface{} {
	n := inputs[0].Int()
	result := Fib(n)
	return result
}

// FibIter - runs the fibonacci sequence, iteratively
func FibIter(n int) int {
	// Reference:
	// https://www.dotnetperls.com/fibonacci-go
	a := 0
	b := 1
	// Iterate until desired position in sequence.
	for i := 0; i < n; i++ {
		// Use temporary variable to swap values.
		temp := a
		a = b
		b = temp + a
	}
	return a
}

func jsFibIter(this js.Value, inputs []js.Value) interface{} {
	n := inputs[0].Int()
	result := FibIter(n)
	return result
}
