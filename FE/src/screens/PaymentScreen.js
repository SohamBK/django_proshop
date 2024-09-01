import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

function PaymentScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingAddress } = useSelector((state) => state.cart);

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    if (!shippingAddress.address) {
        navigate('/shipping');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            value='PayPal'
                            checked={paymentMethod === 'PayPal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;
