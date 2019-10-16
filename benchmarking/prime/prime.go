package main

// References:
// https://tutorialedge.net/golang/go-webassembly-tutorial/

import (
	"syscall/js"
)

func main() {
	c := make(chan bool)
	println("WASM Go Initialized")
	registerCallbacks()
	<-c
}

func add(i []js.Value) {
	js.Global().Set("output", js.ValueOf(i[0].Int()+i[1].Int()))
	println(js.ValueOf(i[0].Int() + i[1].Int()).String())
}

func registerCallbacks() {
	js.Global().Set("add", js.FuncOf(add))
}

// Prime - generates all prime numbers up to N
// https://stackoverflow.com/questions/21854191/generating-prime-numbers-in-go
func Prime(N int) (primes []int) {
	b := make([]bool, N)
	for i := 2; i < N; i++ {
		if b[i] == true {
			continue
		}
		primes = append(primes, i)
		for k := i * i; k < N; k += i {
			b[k] = true
		}
	}
	return
}
