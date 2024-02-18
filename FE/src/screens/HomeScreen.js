import React from 'react'
import {Row, Col} from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product.js';

function HomeScreen() {
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
            <Col key={products._id} Sm={12} Md={6} Lg={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen
