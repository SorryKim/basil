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
function createLoad(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {
    // 부하 생성 로직 (예: 무한 루프, 계산 등)
  }
}

// 서버 부하 생성 라우트
app.get("/load-server", (req, res) => {
  // 부하 생성 (예: 5초 동안 부하 생성)
  createLoad(5000);
  res.status(200).send("Server loaded successfully");
});