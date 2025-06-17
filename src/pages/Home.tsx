import { useEffect } from "react";
import "../App.css";
import {
  fetchProductThunk,
} from "../redux-toolkit/slices/product.slice";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { Box, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";

function Home() {
  const { productData, isProductLoading, isProductError } =
    useAppSelector((s) => s.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductThunk());
  }, []);

  return (
    <Box>
      <Link to="/about">go to about page</Link>
      {isProductLoading ? (
        "Loading products"
      ) : (
        <>
          {isProductError ? (
            "Something went wrong"
          ) : (
            <Grid container mt={2} spacing={1} p={5}>
              {productData?.map((item) => (
                <Grid size={4} key={item?.id}>
                  <ProductCard
                    title={item?.title}
                    image={item?.image}
                    id={item?.id}
                    category={item?.category}
                    rate={item?.rating?.rate}
                    price={item?.price}
                    count={item?.rating?.count}
                    description={item?.description}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
}

export default Home;
