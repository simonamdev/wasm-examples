// References:
// https://dev.to/azure/experimenting-with-web-assembly-and-nodejs-40f4
// https://www.codepool.biz/use-webassembly-node-js.html
// https://gist.github.com/kripken/59c67556dc03bb6d57052fedef1e61ab

const fs = require('fs');
const source = fs.readFileSync('./add.wasm');

const typedArray = new Uint8Array(source);

const env = {
  abortStackOverflow: () => {
    throw new Error('overflow');
  },
  __memory_base: 1024,
  __table_base: 0,
  memory: new WebAssembly.Memory({
    initial: 256,
    maximum: 256
  }),
  table: new WebAssembly.Table({
    initial: 0,
    maximum: 0,
    element: 'anyfunc'
  }),
  STACKOP: 0
};

WebAssembly.instantiate(typedArray, {
  env: env
})
  .then(result => {
    const add = result.instance.exports._add;
    global.add = add;
    console.log(add(9, 9));
  })
  .catch(e => {
    // error caught
    console.log(e);
  });
