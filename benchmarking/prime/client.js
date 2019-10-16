console.log('Benchmark');

const fib = n => (n < 2 ? n : fib(n - 1) + fib(n - 2));

console.log('Running JS Version');

const start = new Date();
// for (let i = 0; i < 200; i++) {
//   fib(30);
// }
const end = new Date();
const durationJS = end - start;

document.getElementById('js').innerText = durationJS.toString();

console.log('Initialising Wasm Version');

const goPart = async () => {
  const go = new Go();
  // WebAssembly.instantiateStreaming(fetch('prime.wasm'), go.importObject).then(result => {
  //   go.run(result.instance);
  // });
  const response = await fetch('prime.wasm');
  const buffer = await response.arrayBuffer();
  const result = await WebAssembly.instantiate(buffer, go.importObject);
  console.log(result);

  // obj.instance.exports.exported_func();
  go.run(result.instance);
};

goPart();
