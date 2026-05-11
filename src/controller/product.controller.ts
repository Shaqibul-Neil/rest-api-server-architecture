import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.types";
import { parseBody } from "../utilis/parseBody";
import { sendResponse } from "../utilis/sendResponse";

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
    try {
      const products: IProduct[] = readProduct();
      return sendResponse(
        res,
        200,
        true,
        "Product fetched successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }
  //Get Single Product
  else if (method === "GET" && id !== null) {
    try {
      const products = readProduct();
      const product = products.find((p: IProduct) => p.id === id);

      if (!product) {
        return sendResponse(res, 404, false, "Product not found");
      }
      return sendResponse(
        res,
        200,
        true,
        "Product fetched successfully",
        product,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
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
  //Update Product
  else if ((method === "PUT" || method === "PATCH") && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
        }),
      );
    } else {
      products[index] = { id: products[index].id, ...body };
      insertProduct(products);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product updated successfully",
          data: products[index],
        }),
      );
    }
  }
  //Delete Product
  else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
        }),
      );
    } else {
      products.splice(index, 1);
      insertProduct(products);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product deleted successfully",
          data: null,
        }),
      );
    }
  }
};
