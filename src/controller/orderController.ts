import { orderService } from "../service/order.service";
import type { TReq, TRes } from "../types/type";
import { extractRequestInfo } from "../utilis/extractReqInfo";
import { sendResponse } from "../utilis/sendResponse";
import type { IOrder } from "../types/food.types";

export const orderController = async (req: TReq, res: TRes) => {
  const { url, params, method, body } =
    await extractRequestInfo<Omit<IOrder, "id">>(req);
  const orderId = params[1];

  try {
    if (method === "GET" && !orderId) {
      const orders = await orderService.getAllOrders();
      sendResponse(
        res,
        { message: "Orders fetched successfully", data: orders },
        200,
      );
      return;
    }

    if (method === "GET" && orderId) {
      const order = await orderService.getOrderById(orderId);
      sendResponse(
        res,
        {
          message: order ? "Order fetched successfully" : "Order not found",
          data: order,
          error: !order,
        },
        order ? 200 : 404,
      );
    }

    if (method === "DELETE" && orderId) {
      const deleted = await orderService.deleteOrder(orderId);
      sendResponse(
        res,
        {
          message: deleted
            ? "Order deleted successfully"
            : "Could not delete. Order not found",
          error: !deleted,
        },
        deleted ? 200 : 404,
      );
    }

    if (method === "POST" && body) {
      const newOrder = await orderService.createOrder(body);
      sendResponse(
        res,
        {
          message: newOrder
            ? "Order created successfully"
            : "Could not create order.",
          data: newOrder,
        },
        newOrder ? 201 : 404,
      );
    }

    if (method === "PUT" && body && orderId) {
      const updatedOrder = await orderService.updateOrder(orderId, body);
      sendResponse(
        res,
        {
          message: updatedOrder
            ? "Order updated successfully"
            : "Could not updated order.",
          data: updatedOrder,
        },
        updatedOrder ? 201 : 404,
      );
    }
    sendResponse(res, { message: "Route not found" }, 404);
  } catch (error) {
    const err = error instanceof Error ? error.message : "Server Error";
    sendResponse(res, { message: err, error: true }, 500);
  }
};
