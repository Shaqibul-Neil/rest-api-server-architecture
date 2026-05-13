import type { TReq } from "../types/type";

export const extractRequestInfo = async <T>(req: TReq) => {
  const params = req.url?.split("/").filter(Boolean) ?? [];

  const body =
    req.method === "POST" || req.method === "PUT" || req.method === "PATCH"
      ? await parseBody2<T>(req)
      : null;

  return {
    url: req.url ?? "/",
    method: req.method ?? "GET",
    params,
    body,
  };
};

export const parseBody2 = async <T>(req: TReq): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));

    req.on("end", () => {
      try {
        resolve(JSON.parse(body) as T);
      } catch (error) {
        reject(new Error("Invalid Error"));
      }
    });
  });
};
