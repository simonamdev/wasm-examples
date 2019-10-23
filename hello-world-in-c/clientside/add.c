// Reference:
// https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html#interacting-with-code-ccall-cwrap

#include <stdio.h>

int add(int a, int b) {
  return a + b;
}
