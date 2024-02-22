import React from 'react'
import {Card, CardBody, CardImg, CardText, CardTitle} from 'react-bootstrap';
import Rating from './Rating'
import { Link } from 'react-router-dom';

function Product({product}) {
  return (
    <Card className='my-3 p-3 rounded' >
      <Link to={`/product/${product._id}`}>
        <CardImg  src={product.image} />
      </Link>
      <CardBody>
        <Link to={`/product/${product._id}`}>
            <CardTitle as="div">
                <strong>{product.name}</strong>
            </CardTitle>
        </Link>

        <CardText as="div">
            {/* {product.rating} from {product.numReviews} reviews */}
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
        </CardText>

        <CardText as="h3">
            ${product.price}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default Product
