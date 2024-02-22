import React from 'react'
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Button, Card} from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';
import { useParams } from 'react-router-dom';

function ProductScreen({ match }) {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  )
}

export default ProductScreen
