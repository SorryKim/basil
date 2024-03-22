// BlackFridayPage.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductList from './ProductList';

const BlackFridayPage = () => {
  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Black Friday Sale</h1>
          <ProductList blackFriday={true} />
        </Col>
      </Row>
    </Container>
  );
};

export default BlackFridayPage;