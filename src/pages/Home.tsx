import { useEffect } from "react";
import "../App.css";

import {
  fetchProductThunk,
  setCartCount,
} from "../redux-toolkit/slices/product.slice";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";

function Home() {
  const { productData, isProductLoading, isProductError, cartItems } =
    useAppSelector((s) => s.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductThunk());
  }, []);

  return (
    <>
      <Link to="/about">go to about page</Link>
      {isProductLoading ? (
        "Loading products"
      ) : (
        <>
          {isProductError ? (
            "Something went wrong"
          ) : (
            <>
              {productData?.map((item) => (
                <>
                  <h2>{item?.title}</h2>
                  {cartItems?.find((i) => i.id === item?.id) ? (
                    "Already added"
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(setCartCount(item));
                      }}
                    >
                      Add to cart
                    </button>
                  )}
                </>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Home;
