import { createServer, IncomingMessage, Server } from "http";
import { routeHandler } from "./routes/routes";
import config from "./config";

const server: Server = createServer((req: IncomingMessage, res) => {
  routeHandler(req, res);
});

server.listen(config.port, () => {
  console.log(`server running on port ${config.port}`);
});
