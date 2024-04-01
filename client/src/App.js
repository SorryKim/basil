import React, { useState } from "react";
import { Navbar, Nav, Container, Spinner, Card } from "react-bootstrap";
import ProductList from "./ProductList";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const blackFriday = false; // 블랙프라이데이 여부

  const handleLoadServer = async () => {
    setLoading(true);
    try {
      const response = await fetch("/load-server");
      if (!response.ok) {
        throw new Error("Failed to load server");
      }
      console.log("Server loaded successfully");
    } catch (error) {
      console.error("Error loading server:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" className="navbar">
        <Container>
          <h2>Basil Shop !!</h2>
        </Container>
      </Navbar>
      <center>
        <Container className="my-5">
          <Card>
            <Card.Body>
              <div className="text-center mb-4">
                <h1 className="display-5 fw-bold mb-3">Project Basil</h1>
                <p className="fs-4">카카오 클라우드 스쿨 팀 프로젝트</p>
              </div>
              <div className="d-flex justify-content-center">
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
            </Card.Body>
          </Card>
        </Container>
      </center>

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

      <footer className="py-3">
        <Container>
          <p className="m-0 text-center">Copyright &copy; Nature Shop 2024</p>
        </Container>
      </footer>
    </>
  );
}

export default App;
