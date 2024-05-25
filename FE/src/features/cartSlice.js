import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: '',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existItem = state.cartItems.find(item => item.product === newItem.product);

            if (existItem) {
                existItem.qty = newItem.qty;
            } else {
                state.cartItems.push(newItem);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeItemFromCart: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.product !== productId);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod));
        },
        clearCartItems: (state) => {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }
    }
});

export const { addItemToCart, removeItemFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
