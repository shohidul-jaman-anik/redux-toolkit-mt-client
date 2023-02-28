import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProduct } from "./productsApi";

const initialState = {
    products: [],
    isLoading: false,
    postSuccess: false,
    isError: false,
    error: ""
}

export const getProducts = createAsyncThunk("products/getProduct", async () => {
    const products = fetchProducts()
    return products
})

export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
    const products = postProduct(data)
    return products
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true
            state.isError = false;
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.isLoading = false;
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.products = []
            state.isLoading = false
            state.isError = true;
            state.error = action.error.message;
        })



        builder.addCase(addProduct.pending, (state, action) => {
            state.isLoading = true;
            state.postSuccess = false;
            state.isError = false;
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.postSuccess = true;
            state.isLoading = false;
        })
        builder.addCase(addProduct.rejected, (state, action) => {
            state.products = []
            state.isLoading = false;
            state.postSuccess = false
            state.isError = true;
            state.error = action.error.message;
        })
    }
})

export default productsSlice.reducer;