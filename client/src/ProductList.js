// ProductList.js
import React, { useState, useEffect } from "react";
import "./ProductList.css";

function ProductList({ blackFriday }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://211.183.3.201:8088")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("데이터 가져오기 실패:", error));
  };

  const imagePaths = {
    "맥주": "img/맥주.jpeg",
    "소주": "img/소주.jpeg",
    "소맥": "img/소맥.png",
    "와인": "img/와인.png",
    "감자": "img/감자.jpg",
    "고구마": "img/고구마.jpg",
    "깻잎": "img/깻잎.jpg",
    "배추": "img/배추.jpg",
    "상추": "img/상추.jpg",
    "시금치": "img/시금치.jpg",
    "쌈배추": "img/쌈배추.jpg",
    "알배기배추": "img/알배기배추.jpg",
    "양배추": "img/양배추.jpg",
    "적상추": "img/적상추.jpg",
    "절임배추": "img/절임배추.jpg",
    "쫑상추": "img/쫑상추.jpg",
    "청상추": "img/청상추.jpg"
  };

  const handlePurchase = async (productName, productId) => {
    const confirmed = window.confirm(
      `'${productName}'을(를) 구매하시겠습니까?`
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://211.183.3.201:8088/buy/${productId}`,
          {
            method: "POST",
          }
        );
        if (response.ok) {
          alert(`${productName}을(를) 구매했습니다.`);
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
          <img src={imagePaths[product.name]} alt={product.name} />
          <h3>{product.name}</h3>
          <p>
            {blackFriday ? (
              <>
                <del>${product.price.toFixed(0)}</del>{" "}
                <span className="text-danger fw-bold">
                  ${(product.price / 2).toFixed(0)}
                </span>{" "}
                <span className="sale-badge">50% Sale 중</span>
              </>
            ) : (
              `$${product.price.toFixed(2)}`
            )}
          </p>
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
