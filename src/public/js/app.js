const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("브라우저와 연결되었습니다");
});

socket.addEventListener("message", async (message) => {
  //   console.log("서버로부터 새로운 메세지:", message);
  const data = await message.data;
  //   console.log(message, data);
  const li = document.createElement("li");
  li.innerText = data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("서버와 연결이 끊어졌습니다.");
});

function handleSumit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSumit);
nickForm.addEventListener("submit", handleNickSubmit);
