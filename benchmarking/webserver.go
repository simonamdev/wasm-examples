// A basic HTTP server.
// By default, it serves the current working directory on port 8080.
package main

import (
	"flag"
	"log"
	"net/http"
)

var (
	listen = flag.String("listen", ":8081", "listen address")
	dir    = flag.String("dir", "./prime", "directory to serve")
)

func main() {
	flag.Parse()
	log.Printf("listening on %q for dir %q", *listen, *dir)
	err := http.ListenAndServe(*listen, http.FileServer(http.Dir(*dir)))
	log.Fatalln(err)
}
