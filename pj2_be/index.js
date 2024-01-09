const express = require("express");
const errorhandler = require("./middlewares/errorhandler");
const usersRouter = require("./routes/users");
const friendsRouter = require("./routes/friends");
const menusRouter = require("./routes/menu");
const router = express.Router();

const app = express();
const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.json());
app.use("/api/user", usersRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/menu", menusRouter);
app.use(errorhandler);

// 메인 라우터
app.get("/", (_req, res) => {
  res.send("Welcome to your app!");
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});