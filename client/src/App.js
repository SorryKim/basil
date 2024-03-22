import React, { useState } from "react";
import { Navbar, Nav, Container, Spinner } from "react-bootstrap";
import ProductList from "./ProductList";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const blackFriday = true;
  const handleLoadServer = () => {
    setLoading(true);

    fetch("/load-server")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load server");
        }
        console.log("Server loaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading server:", error);
        setLoading(false);
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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/blackfriday">Black Friday</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <header className="py-3"></header>

      <Container>
        <div className="p-4 bg-light rounded-3 text-center">
          <div className="m-4">
            <h1 className="display-5 fw-bold">BASIL</h1>
            <p className="fs-4">카카오클라우드스쿨 팀프로젝트 BASIL</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={handleLoadServer}
            >
              {loading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "서버에 부하주기"
              )}
            </button>
          </div>
        </div>
      </Container>

      {blackFriday && (
        <center>
          <h2>BLACK FRIDAY !!</h2>
        </center>
      )}
      {blackFriday ? (
        <ProductList blackFriday={true} />
      ) : (
        <ProductList blackFriday={false} />
      )}

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
