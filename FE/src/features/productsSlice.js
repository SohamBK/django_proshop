import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLoading: false,
    isError: false,
    error: "",
    success: false,
    products: [],
    product: {}
}

// Create async thunks
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
      try {
        const { data } = await axios.get('/api/products/');
        return data;
      } catch (error) {
        throw Error("Failed to fetch products: " + error.message);
      }
    }
);
  
export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async (id) => {
      try {
        const { data } = await axios.get(`/api/products/${id}/`);
        return data;
      } catch (error) {
        throw Error("Failed to fetch product details: " + error.message);
      }
    }
);

// Create products slice
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.isLoading = true;
          state.isError = false; // Reset isError flag when starting a new request
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.products = action.payload;
          state.success = true;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message || "Failed to fetch products";
        })
        .addCase(fetchProductDetails.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
          state.isLoading = false;
          state.product = action.payload;
          state.success = true;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message || "Failed to fetch product details";
        });
    },
});

export default productsSlice.reducer;
