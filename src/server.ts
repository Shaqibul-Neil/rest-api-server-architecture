import { createServer, IncomingMessage, Server } from "http";
import { routeHandler } from "./routes/routes";

const server: Server = createServer((req: IncomingMessage, res) => {
  routeHandler(req, res);
});

server.listen(5000, () => {
  console.log("server running on port 5000");
});
