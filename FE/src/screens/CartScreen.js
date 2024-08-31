import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addItemToCart, removeItemFromCart } from '../features/cartSlice';
import { fetchProductDetails, fetchProducts } from '../features/productsSlice';

function CartScreen() {
    const { id: productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.user.userInfo);

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const products = useSelector(state => state.products.products);
    const productLoading = useSelector(state => state.products.isLoading);
    const productError = useSelector(state => state.products.isError);

    useEffect(() => {
        if (productId) {
            dispatch(addItemToCart({ product: productId, qty }));
        }
    }, [dispatch, productId, qty]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        cartItems.forEach(item => {
            if (!products.find(p => p._id === item.product)) {
                console.log("itesm", item.product);
                dispatch(fetchProductDetails(item.product));
            }
        });
    }, [dispatch, cartItems, products]);

    const removeFromCartHandler = (id) => {
        dispatch(removeItemFromCart(id));
    };

    // const checkoutHandler = () => {
    //     navigate('/login?redirect=shipping');
    // };

    const checkoutHandler = () => {
        if (!userInfo) {
            navigate('/login?redirect=shipping');
        } else {
            navigate('/shipping');
        }
    };
    

    if (productLoading) {
        return <div>Loading...</div>;
    }

    if (productError) {
        return <Message variant='danger'>Error fetching products</Message>;
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => {
                            console.log('item', item.product)
                            console.log('all', products)
                            const product = products.find(p => p._id == item.product) || {};
                            console.log("product", product)
                            return (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={product.image} alt={product.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{product.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${product.price}
                                        </Col>
                                        <Col md={3}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addItemToCart({ product: item.product, qty: Number(e.target.value) }))}
                                            >
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={1}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => {
                                const product = products.find(p => p._id == item.product) || {};
                                return acc + item.qty * (product.price || 0);
                            }, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;
