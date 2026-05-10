import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  if (url === "/products" && method === "GET") {
    // const products = [
    //   { id: 1, name: "Product 1" },
    //   { id: 2, name: "Product 2" },
    // ];
    const products = readProduct();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product fetched successfully",
        data: products,
      }),
    );
  }
};
