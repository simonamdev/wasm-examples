# Adding two numbers together (client-side) in C

This example allows us to compile a C function to Wasm and run it in the client.

## Pre-requisites

[Emscripten SDK](https://github.com/emscripten-core/emsdk)

## Running

To run, simply run the following command:

`make`

(If you are not on a Linux/Mac system, look into the Makefile to see the exact command that needs to be run.)

Then access the file `add.html` at `http://localhost:8000`.

Nothing will appear in the console. Open the inspector and run the following two commands in the JS console:

This will wrap the C function and allow us to call it from a JavaSCript variable.
`var add = Module.cwrap('add', 'number', ['number', 'number'])`

This will actually run the command.
`add(2, 5)`
