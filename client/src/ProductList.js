import React, { useState, useEffect } from "react";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:8088")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("데이터 가져오기 실패:", error));
  };

  const imagePaths = {
    1: "img/맥주.jpeg",
    2: "img/소주.jpeg",
    3: "img/소맥.png",
    4: "img/와인.png",
  };

  const handlePurchase = async (productName, productId) => {
    const confirmed = window.confirm(
      `'${productName}'을(를) 구매하시겠습니까?`
    );
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8088/buy/${productId}`, {
          method: "POST",
        });
        if (response.ok) {
          alert(`${productName}을(를) 구매했습니다.`);
          // 상품 구매 후 상품 목록 다시 가져오기
          fetchProducts();
        } else {
          throw new Error("제품 구매에 실패했습니다.");
        }
      } catch (error) {
        console.error("제품 구매 오류:", error);
        alert(error);
      }
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div
          key={product.id}
          className={`product-item ${product.quantity === 0 ? "sold-out" : ""}`}
        >
          {product.quantity === 0 && (
            <div className="sold-out-sticker">Sold Out</div>
          )}
          <img src={imagePaths[product.imgID]} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          {product.quantity === 0 ? (
            <p>Sold Out</p>
          ) : (
            <button onClick={() => handlePurchase(product.name, product.ID)}>
              Buy!
            </button>
          )}
          <p>Remaining quantity: {product.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
