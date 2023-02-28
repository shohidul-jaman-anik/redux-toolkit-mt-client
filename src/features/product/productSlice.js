import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsApi";

const initialState = {
    products: [],
    isLoading: false,
    postSuccess: false,
    deleteSuccess: false,
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

export const removeProduct = createAsyncThunk("products/removeProduct", async (id, thunkApi) => {
    const products = await deleteProduct(id)
    thunkApi.dispatch(removeFormList(id))
    return products
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostSuccess: (state) => {
            state.postSuccess = false;
        },
        toggleDeleteSuccess: (state) => {
            state.deleteSuccess = false;
        },
        removeFormList: (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload)
        }
    },
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


        builder.addCase(removeProduct.pending, (state, action) => {
            state.isLoading = true;
            state.deleteSuccess = false;
            state.isError = false;
        })
        builder.addCase(removeProduct.fulfilled, (state, action) => {
            state.deleteSuccess = true;
            state.isLoading = false;
        })
        builder.addCase(removeProduct.rejected, (state, action) => {
            state.products = []
            state.isLoading = false;
            state.deleteSuccess = false
            state.isError = true;
            state.error = action.error.message;
        })
    }
})


export const { togglePostSuccess, toggleDeleteSuccess, removeFormList } = productsSlice.actions;
export default productsSlice.reducer;