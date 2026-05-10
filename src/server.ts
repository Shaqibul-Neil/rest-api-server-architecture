import { createServer, IncomingMessage, Server } from "http";

const server: Server = createServer((req: IncomingMessage, res) => {
  //console.log(req.url, req.method);
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World");
  }
});

server.listen(5000, () => {
  console.log("server running on port 5000");
});
