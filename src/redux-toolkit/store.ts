import { combineSlices, configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/product.slice";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import localStorage from "redux-persist/lib/storage";

const rootReducer = combineSlices({
  // const {}=useAppSelector(s=>s.product)
  product: ProductSlice,
  //auth
  // user
});

// xyz =

const persistConfig = {
  key: "redux-local",
  storage: localStorage,
  // jei slice gulo stoage ae save korte chichina 
//   blacklist:['productdd']
};

const _persistReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: _persistReducer,
});

export const _persistStore=persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
