console.log('Benchmark');

const jsFib = n => (n < 2 ? n : jsFib(n - 1) + jsFib(n - 2));

console.log('Running JS Version');

const start = new Date();
for (let i = 0; i < 200; i++) {
  jsFib(30);
}
const end = new Date();
const durationJS = end - start;

document.getElementById('js').innerText = durationJS.toString();

async function init() {
  if (!WebAssembly.instantiateStreaming) {
    // polyfill
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
      const source = await (await resp).arrayBuffer();
      return await WebAssembly.instantiate(source, importObject);
    };
  }

  const go = new Go();

  let result = await WebAssembly.instantiateStreaming(fetch('fib.wasm', {}), go.importObject);
  go.run(result.instance);
}

console.log('Initialising Wasm Version');

init().then(() => {
  console.log('Running Wasm Version');

  const startWasmRecur = new Date();
  for (let i = 0; i < 200; i++) {
    fib(30);
  }
  const endWasmRecur = new Date();
  const durationWasmRecur = endWasmRecur - startWasmRecur;

  document.getElementById('wasm-recur').innerText = durationWasmRecur.toString();
  const jsWasmRecurDiff = (Math.abs(durationJS - durationWasmRecur) / ((durationJS + durationWasmRecur) / 2)) * 100;
  document.getElementById('js-to-wasm-recur').innerText = `${
    durationWasmRecur > durationJS ? '+' : '-'
  }${jsWasmRecurDiff.toFixed(2)}`;

  const startWasm = new Date();
  for (let i = 0; i < 200; i++) {
    fibIter(30);
  }
  const endWasm = new Date();
  const durationWasm = endWasm - startWasm;

  document.getElementById('wasm').innerText = durationWasm.toString();
  const jsWasmDiff = (Math.abs(durationJS - durationWasm) / ((durationJS + durationWasm) / 2)) * 100;
  document.getElementById('js-to-wasm').innerText = `${durationWasm > durationJS ? '+' : '-'}${jsWasmDiff.toFixed(2)}`;
});
