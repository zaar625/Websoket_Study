import express from "express";
import WebSocket from "ws";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = createServer(app); // http 서버를 만들고
// const wss = new WebSocket.Server({ server }); //http 서버 위에 소켓을 올리는 과정이다.
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  console.log(socket);
});

httpServer.listen(3000); // http 서버 위에 webSocket 서버를 만들 수 있도록 한 것임.
