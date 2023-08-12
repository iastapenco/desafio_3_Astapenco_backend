import { promises as fs } from "fs";
import ProductManager from "./productManager.js";
import express from "express";

const PORT = 8080;
const app = express();

const productManager = new ProductManager();

app.get("/", async (req, res) => {
  await res.status(200).send("Hola, bienvenido a nuestro coffee shop online");
});

app.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  const { limit } = req.query;
  if (limit) {
    const prods = products.slice(0, limit);
    await res.status(200).send(prods);
  } else {
    await res.status(200).send(products);
  }
});

app.get("/products/:pid", async (req, res) => {
  const pId = parseInt(req.params.pid);
  const prod = await productManager.getProductById(pId);
  prod
    ? res.status(200).send(prod)
    : res.status(404).send("Producto no existente");
});

app.listen(PORT, async () => {
  await console.log(`Server on port ${PORT}`);
});
