import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchproductList } from "../../api/functions/product.api";
import type { IProductSliceInitialState } from "../typescript/productslice.interface";
import type { IProductObj } from "../../typescript/interfaces/product.api";

// async thunk;
export const fetchProductThunk = createAsyncThunk(
  "product-list-thunk",
  async () => {
    const res = await fetchproductList();
    return res;
  }
);

// pending , fullfilled , rejected

const initialState: IProductSliceInitialState = {
  isProductLoading: false,
  productData: [],
  isProductError: false,
  cartItems: [],
};

// 1 , 2
// 2 => filter kore 2 => [1]

const ProductSlice = createSlice({
  name: "product-slice",
  initialState,
  reducers: {
    addItemToCart: (state, { payload }:{payload:IProductObj}) => {
      state.cartItems = [...state.cartItems, payload];
    },
    removeFromCart:(state,{payload}:{payload:number})=>{
      // const index=state.cartItems.findIndex(item=>item?.id===payload)
      // index ta pele amra splice method use korbo
      state.cartItems=state.cartItems.filter(item=>item?.id!==payload);

    }
  },
  extraReducers: (builder) => {
    // pending state
    builder.addCase(fetchProductThunk.pending, (state, action) => {
      const { payload, type } = action;
      console.log(payload, type);
      state.isProductLoading = true;
      state.isProductError = false;
      state.productData = [];
    });
    // fullfilled
    builder.addCase(fetchProductThunk.fulfilled, (state, action) => {
      const { payload } = action;
      state.isProductLoading = false;
      state.isProductError = false;
      state.productData = payload;
    });
    //rejected
    builder.addCase(fetchProductThunk.rejected, (state) => {
      state.isProductLoading = false;
      state.isProductError = true;
      state.productData = [];
    });
  },
});

export const { addItemToCart ,removeFromCart} = ProductSlice.actions;

export default ProductSlice.reducer;
