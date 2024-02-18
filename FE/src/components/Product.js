import React from 'react'
import {Card, CardBody, CardImg, CardText, CardTitle} from 'react-bootstrap';

function Product({product}) {
  return (
    <Card className='my-3 p-3 rounded' >
      <a href={`/products/${product._id}`}>
        <CardImg  src={product.image} />
      </a>
      <CardBody>
        <a href={`/products/${product._id}`}>
            <CardTitle as="div">
                <strong>{product.name}</strong>
            </CardTitle>
        </a>

        <CardText as="div">
            {product.rating} from {product.numReviews} reviews
        </CardText>

        <CardText as="h3">
            ${product.price}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default Product
