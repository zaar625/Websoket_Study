# Zoom

Zoom clone using WebRTC and Websockets

#### Server Setup

1. package.json 파일을 초기화 합니다.

```
npm init -y
```

2. 리드미 파일을 생성합니다.

```
touch README.md
```

3. nodemon을 설치합니다.

```
npm i nodemon -D
```

4. 바벨을 설치합니다.

```
 npm i @babel/cli @babel/core @babel/node @babel/preset-env
```

5. 파일 루트 내에 babel.config.json 파일을 만들고 아래와 같이 작성합니다.

```
{
    "presets": ["@babel/preset-env"]
}
```

6. 파일루트 내에 nodemon.json 파일을 만들고 아래와 같이 작성합니다.

```
{
    "exec" : "babel-node src/server.js"
}
```

7. 파일 루트 내에 scr 폴더를 만들고 그 안에 server.js 파일을 만듭니다. 그리고 아래와 같이 코드를 작성합니다.

```
import express from "express";

const app = express();

console.log("hello");

app.listen(3000);
```

8. express 와 pug를 설치합니다

```
npm i express pug
```

9. package.json 파일에 아래코드를 작성합니다.

```
 "scripts": {
    "dev": "nodemon"
  }
```

- nodemon을 실행하면 nodemon이 nodemon.json을 살펴보고 거기있는 코드를 실행시킬 것입니다.

---

#### 1.1 Chat width websokets

- 일반적인 HTTP 프로토콜: 백엔드는 response를 주고나서 더이상 유저를 기억하지 않는다.
- websocket : request, response 과정이 필요하지 않고, 그냥 발생.
- websocket은 어떤 프로그래밍 언어에 국한돼 있지 않는다. 그저 protocol이다.
- websocket도 마찬가지로 브라우저와 backend 사이에서만 발생하지 않는다. 서버와 서버 사이에도 연결이 가능하다.

#### 1.2 Websockets in Node.js

- node.js로 웹소켓을 만드는 과정. -> ws라는 아주 멋진 package의 도움을 받을 것임.
- implementation : 어떤 규칙을 따르는 코드.

#### 1.3 Websoket Events

- 아무것도 설치할 필요없이 브라우저에서 지원됨.

#### 1.4 Websocket Meassage

#### 1.6 Chat Complated

- 서로 다은 브라우저는 서로 메시지를 주고받지 못한다. -> 해결하는 과정을 보여준다.

#### 1.7 NickNames part One

- 우리가 메세지를 보낼 때, 백엔드에서는 누가 메세지를 보냈는지 구분하지 못한다. -> 메세지를 구별해주는 방법이 필요하다.
- 아래와 같이 구분을 할 예정이다.

```
  {
  type:"message",
  payload:"hello eveyone!"
  }

  {
  type:"nickName",
  payload:"Nico"
  }
```

#### 1.8 Nicknames part Two

```
  if (parsed.type === "new_message") {
      sockets.forEach((aSocket) =>
        aSocket.send(parsed.payload.toString("utf8"))
      );
    } else if (parsed.type === "nickname") {
      console.log(parsed.payload);
    }
```

위 코드를 아래 처럼 변경할 수 있다.

```
  switch (parsed.type) {
    case "new_message" :
      sockets.forEach(()=>aSocket.send(parsed.payload.toString("utf8")))
    case "nickname":
      console.log(parsed.payload.toString("utf8"))
  }
```

---

#### 2.0 SoketIO vs WebSockets

- SocketIO 는 Websocket의 부가기능이 아니다.
- SocketIO는 프론트와 백엔드 간 실시간 통신을 가능하게 해주는 프레임워크 또는 라이브러리다.
- 프론트와 백엔드 간 실시간 통신을 하기 위해서 꼭 socketIO를 사용할 필요는 없다.
- SocketIO는 연결이 어떤 이유에서든지 끊어지면, 재연결을 시도한다.

#### 2.1 Installing SocketIO

- #1의 내용과 SocketIO를 사용한 코드를 꼭 비교해보자
- io() 함수는 알아서 socket.io를 실행하고 있는 서버를 찾을 것이다.

#### 2.3 SocketIO is Amazing

- 특정한 event를 emit해 줄 수 있다. 어떤 이름이든 상관없이.
- 자바스트립트 오브젝트를 보낼수 있다. 서버에 객체를 스트링으로 변환할 필요가 없다.
- socket.on 뒤에 우리가 원하는 event를 넣어주면 된다.
- socket.emit 에는 콜백이 있는데 서버로부터 실행되는 function이다.? 서버에서 호출하는 function?
  - 프론트에서 인자로(즉 페이로드) 콜백함수를 함께 보낼 수 있다. 이 함수는 서버에서 받아 서버에서 실행 시킬 수 있다.
  - 페이로드의 수량은 제한이 없다.
- 프론트의 socket.emit 과 서버의 socket.on 의 이벤트 이름은 같아야 한다.

#### 2.3 Recap

- emit : 방출하다.
- 서버를 종료하고 브라우저 창을 보자. 클라이언트에서 계속해서 서버와 연결하려고 시도하고 있다.
- 클라이언트에 에밋으로 보낸 인자수량만큼 서버에서도 인자의 수를 동일하게 작성해야한다.
- 클라이언트에서 받은 함수가 처리 비용이 크고 시간이 오래 걸리는 작업을한다고 해보자. 그리고 작업이 완료되면 클라이언트에 알리고 싶다.
  - 주의해야 할 사항은 back-end에서 끝났다는 사실을 알리기 위해 function을 넣고 싶으면 그 function이 가장 마지막 argument가 되어야 한다.
  - 주의해야 할 또 하나, 클라이언트가 보내는 함수는 서버에서 실행하는 것이 아니라, 다시 클라이언트가 실행하는 것이다.
    - 만약에 서버가 실행한다고 가정하자. 누군가가 보내는 함수에 임의로 어떤 사람의 아이디를 삭제한다고 가정했을 때 서버는 신뢰하지 못하는 코드를 실행하게 되는 것이다.
  - 즉 프론트에 있는 (서버에 보낸 함수)는 서버가 시킨것임.!

#### 2.4 Rooms

- socketIO는 기본적으로 룸을 제공한다.

#### 2.5 Room Message

-

#### 2.6 Room Notifications

- io.on(disconnect, ...) 와 io.on(disconnecting, ...)은 고객이 접속을 중단할 것이지만 아직 방을 완전히 나가지는 않는다.
  - 예를 들어 창을 닫거나 컴퓨터가 꺼졌을 때

```
socket.on("new_message", addMessage);
socket.on("new_message", (msg)=>{addMessage(msg)});
//둘다 같다.
```

---

### 중간 정리

- socket.on(eventName, listener)
- socket.onAny(listener): 이벤트가 발생할 때 실핼될 리스너를 추가합니다.
- disconnecting : 이 이벤트는 연결해제와 유사하지만 socket#rooms세트가 아직 비어 있지 않은 경우 조금 더 일찍 시작된다.
- socket.emit : 문자열 이름으로 식별되는 소켓에 이벤트를 내보냅니다. 다른 모든 매개변수를 포함할 수 있으며, 버퍼를 포함하여 모든 직렬화 가능한 데이터 구조가 지원된다.
- socket.join(room): 주어진 방이나 방 목록에 소켓을 추가합니다.
- 소켓이란? 또다른 파이프의 끝이나 파이프 이음쇠를 가리킨다. 은행 창구 같은거 같은데?
- socket.to(room): 이벤트가 지정된 룸에 참여한 클라이언트에게만 브로드 캐스트 되도록 후속 이벤트 방출에 대한 수정자를 설정합니다?

---

#### 2.8 Room Count part-1.

- Adapter의 개념 중요
  - adapter가 기본적으로 하는 일은 다른 서버들 사이에 실시간 어플리케이션을 동기화 하는 것임.
