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

8. express 와  pug를 설치합니다
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
