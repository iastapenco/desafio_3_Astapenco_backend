import express from "express";
const products = [
  { title: "Cafe de Colombia", price: 500, category: "cafe", id: 1 },
  { title: "Cafe de Ecuador", price: 800, category: "cafe", id: 2 },
  { title: "Cafe de Brasil", price: 400, category: "cafe", id: 3 },
  { title: "Cafetera V60", price: 2500, category: "accesorios", id: 4 },
  { title: "Aeropress", price: 2300, category: "accesorios", id: 5 },
];

const PORT = 8080;

const app = express();

app.get("/", async (req, res) => {
  await res.status(200).send("Hola, bienvenido a nuestro coffee shop online");
});

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  if (limit) {
    const prods = products.slice(0, limit);
    await res.status(200).send(prods);
  } else {
    await res.status(200).send(products);
  }
});

app.get("/products/:pid", async (req, res) => {
  const prod = products.find((prod) => prod.id === parseInt(req.params.pid));
  (await prod)
    ? res.status(200).send(prod)
    : res.status(404).send("Producto no existente");
});

app.listen(PORT, async () => {
  await console.log(`Server on port ${PORT}`);
});
