import express from "express";
import WebSocket from "ws";
import http from "http";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log("backend: 서버와 연결이 끊어졌습니다.");
}

const sockets = [];

wss.on("connection", (socket) => {
  console.log("backend: Connected to Browser OK!");
  sockets.push(socket);
  socket["nickname"] = "Non-User";
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    // console.log(parsed, message);
    if (message.type === "new_message") {
      sockets.forEach((aSocket) =>
        //massage.payload.toString("utf8")
        aSocket.send(`${socket.nickname}: ${message.payload.toString("utf8")}`)
      );
    } else if (message.type === "nickname") {
      //   console.log(massage.payload);
      socket["nickname"] = message.payload;
    }

    // socket.send(message.toString("utf8"));
  });
  socket.send("서버에서 보내는 메세지입니다.");
  socket.on("close", onSocketClose);
});

server.listen(3000, handleListen); // http 서버 위에 webSocket 서버를 만들 수 있도록 한 것임.
