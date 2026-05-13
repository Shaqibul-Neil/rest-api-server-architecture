import type { IncomingMessage, ServerResponse } from "http";

export type TMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type TRes = ServerResponse;
export type TReq = IncomingMessage & {
  method: TMethod;
};
