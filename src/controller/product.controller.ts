import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.types";
import { parseBody } from "../utilis/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const urlParts = url?.split("/"); //['', 'products', 'id']
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  //Get All Products
  if (url === "/products" && method === "GET") {
    // const products = [
    //   { id: 1, name: "Product 1" },
    //   { id: 2, name: "Product 2" },
    // ];
    const products: IProduct[] = readProduct();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product fetched successfully",
        data: products,
      }),
    );
  }
  //Get Single Product
  else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product fetched successfully",
        data: product,
      }),
    );
  }
  //Create Product
  else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    const products = readProduct();
    products.push(newProduct);
    insertProduct(products);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product created successfully",
        data: newProduct,
      }),
    );
  }
};
