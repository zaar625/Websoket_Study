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
