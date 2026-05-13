import type { TRes } from "../types/type";

export const sendResponse = <T>(
  res: TRes,
  { message, data, error }: { message: unknown; data?: T; error?: boolean },
  statusCode = 200,
): void => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: error ? false : true,
      message: message,
      data: error ? [] : data,
    }),
  );
};
