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
                existItem.quantity = newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
        },
        removeItemFromCart: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.product !== productId);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        clearCartItems: (state) => {
            state.cartItems = [];
        }
    }
});

export const { addItemToCart, removeItemFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
