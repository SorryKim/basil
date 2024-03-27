var express = require("express");
var app = express(); // request, response
const cors = require("cors");
app.use(cors());

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const mdbCon = require("./mariaDBConn.js");
const PORT = 8088; // 포트 번호 설정

app.get("/", async (req, res) => {
  try {
    // MariaDB에서 데이터 불러오기
    const rows = await mdbCon.getProductList();

    // 클라이언트에 JSON 형태로 응답
    res.json(rows);
  } catch (err) {
    console.error("데이터 불러오기 실패:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api", (req, res) => {
  res.send({ message: "hello" });
});

app.listen(PORT, () => {
  console.log(`서버가 포트 
  ${PORT}에서 실행중입니다.`);
});

app.post("/buy/:id", async (req, res) => {
  const productId = req.params.id; // URL에서 id 추출4+
  try {
    const result = mdbCon.buyProduct(productId);

    if (result) res.status(200).send("제품을 성공적으로 구매했습니다.");
    else res.status(500).send("제품 구매에 실패했습니다.");
  } catch (error) {
    console.error("제품 구매 오류:", error);
    // 오류 발생 시 클라이언트에 오류 응답을 전송합니다.
    res.status(500).send("제품 구매에 실패했습니다.");
  }
});
// 임의의 부하를 생성하는 함수
function createLoad(duration, cpuLoad) {
  const start = Date.now();
  const arr = [];

  while (Date.now() - start < duration) {
    // CPU 집약적인 작업 수행
    for (let i = 0; i < cpuLoad; i++) {
      for (let j = 0; j < 10000000; j++) {
        arr.push(j * j * j);
      }
    }
  }
}

// 서버 부하 생성 라우트
app.get("/load-server", (req, res) => {
  const cpuLoad = req.query.cpuLoad || 100000; // CPU 부하 수준 (기본값: 100000)
  const duration = req.query.duration || 60000; // 부하 생성 시간 (밀리초, 기본값: 60초)

  // 부하 생성
  createLoad(duration, cpuLoad);

  res.status(200).send("Server loaded successfully");
});
