import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchproductList } from "../../api/functions/product.api";

// async thunk;
export const fetchProductThunk = createAsyncThunk(
  "product-list-thunk",
  async () => {
    const res = await fetchproductList();
    return res;
  }
);

// pending , fullfilled , rejected

const initialState = {
  //
  isProductLoading: false,
  productData: [],
  isProductError: false,
  //
  cartItems: [],
};

const ProductSlice = createSlice({
  name: "product-slice",
  initialState,
  reducers: {
    setCartCount: (state, { payload }) => {
      state.cartItems = [...state.cartItems, payload];
    },
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
      const { payload, type } = action;
      state.isProductLoading = false;
      state.isProductError = false;
      state.productData = payload;
    });
    //rejected
    builder.addCase(fetchProductThunk.rejected, (state, action) => {
      const { payload, type } = action;
      state.isProductLoading = false;
      state.isProductError = true;
      state.productData = [];
    });
  },
});

export const { setCartCount } = ProductSlice.actions;

export default ProductSlice.reducer;
