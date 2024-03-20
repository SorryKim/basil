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

app.get("/load-server", (req, res) => {
  // 서버에 부하를 주는 작업 수행
  // 예: 시간이 오래 걸리는 작업, 대용량 파일 다운로드 등
  // CPU를 사용하는 작업을 수행
  const iterations = 1000000000; // 작업 반복 횟수 설정

  let result = 0;
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i); // 간단한 수학 계산 수행
  }
  console.log(result);

  // 응답 전송
  res.status(200).send("Server loaded successfully");
});
