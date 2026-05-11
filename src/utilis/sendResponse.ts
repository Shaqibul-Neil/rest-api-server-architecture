import type { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any,
) => {
  const response = {
    success: success,
    message: message,
    data,
  };
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(response));
};
