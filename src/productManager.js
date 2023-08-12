import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.path = "./products.json";
  }

  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return products;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((prod) => prod.id === id);
  }
}
export default ProductManager;
