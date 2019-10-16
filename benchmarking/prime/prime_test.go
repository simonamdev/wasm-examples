package prime

import (
	"testing"
)

// Reference:
// https://dave.cheney.net/2013/06/30/how-to-write-benchmarks-in-go
func BenchmarkPrime(b *testing.B) {
	for n := 0; n < b.N; n++ {
		Prime(1000000)
	}
}
