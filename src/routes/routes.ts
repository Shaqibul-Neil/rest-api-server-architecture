import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";
import { sendResponse } from "../utilis/sendResponse";
import { orderController } from "../controller/orderController";
import type { TReq } from "../types/type";

export const routeHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url ?? "/";
  const method = req.method;

  if (url === "/" && method === "GET") {
    sendResponse(res, { message: "Hello Worldsssss" }, 200);

    return;
  } else if (url?.startsWith("/products")) {
    productController(req, res);
  } else if (url?.startsWith("/orders")) {
    await orderController(req as TReq, res);
  } else {
    sendResponse(res, { message: "route not found" }, 404);
    return;
  }
};
