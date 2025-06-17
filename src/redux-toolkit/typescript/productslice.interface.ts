import type { TProductResponse } from "../../typescript/interfaces/product.api";

export interface IProductSliceInitialState {
  isProductLoading: boolean;
  productData: TProductResponse;
  isProductError: boolean;
  //
  cartItems: TProductResponse;
}
