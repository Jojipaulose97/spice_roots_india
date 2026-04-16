async function run() {
  const res = await fetch('http://localhost:4000/api/v1/products', {
    method: 'GET'
  });
  console.log(res.status);
  console.log(await res.json());
}
run();

