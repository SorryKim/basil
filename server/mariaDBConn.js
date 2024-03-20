const mariadb = require("mariadb");
const vals = require("./consts.js");

const pool = mariadb.createPool({
  host: vals.DBHost,
  port: vals.DBPort,
  user: vals.DBUser,
  password: vals.DBPass,
  connectionLimit: 5,
});

async function GetProductList() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE Basil");
    rows = await conn.query("SELECT * FROM Product");
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    return rows; // 전체 배열을 반환하도록 수정
  }
}

async function BuyProduct(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    conn.query("USE Basil");

    // 제품 구매 쿼리 실행
    const result = await conn.query(
      "UPDATE Product SET quantity = quantity - 1 WHERE id = ?",
      [id]
    );

    // 영향 받은 행의 수를 반환하여 제품이 성공적으로 구매되었는지 확인
    if (result.affectedRows === 1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
}

module.exports = {
  getProductList: GetProductList,
  buyProduct: BuyProduct,
};
