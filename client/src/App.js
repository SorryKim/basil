import React, { useState } from "react";
import { Navbar, Nav, Container, Spinner } from "react-bootstrap"; // Spinner 추가
import ProductList from "./ProductList";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false); // 로딩 상태 변수 추가

  const handleLoadServer = () => {
    setLoading(true); // 요청 보내기 전에 로딩 상태를 true로 설정

    // 서버에 요청을 보내는 fetch API를 사용
    fetch('/load-server')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load server');
        }
        // 응답 처리
        console.log('Server loaded successfully');
        setLoading(false); // 요청이 완료되면 로딩 상태를 false로 설정
      })
      .catch(error => {
        // 오류 처리
        console.error('Error loading server:', error);
        setLoading(false); // 요청이 실패하더라도 로딩 상태를 false로 설정
      });
  };

  return (
    <>
      <Navbar bg="warning" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Basil Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Header */}
      <header className="py-3"></header>

      <body>
        <Container>
          <div className="p-4 bg-light rounded-3 text-center">
            <div className="m-4">
              <h1 className="display-5 fw-bold">BASIL</h1>
              <p className="fs-4">카카오클라우드스쿨 팀프로젝트 BASIL</p>
              {/* 클릭 시 handleLoadServer 함수 호출 */}
              <button className="btn btn-primary btn-lg" onClick={handleLoadServer}>
                {loading ? <Spinner animation="border" role="status" /> : '서버에 부하주기'}
              </button>
            </div>
          </div>
        </Container>
        <ProductList />
      </body>
      {/* Footer */}
      <footer className="py-5 bg-dark">
        <Container>
          <p className="m-0 text-center text-white">
            Copyright &copy; SorryKim 2024
          </p>
        </Container>
      </footer>
    </>
  );
}

export default App;
