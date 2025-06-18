import { useEffect } from "react";
import "../App.css";
import { fetchProductThunk } from "../redux-toolkit/slices/product.slice";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Container,
} from "@mui/material";
import ProductCard from "../components/ProductCard";

function Home() {
  const { productData, isProductLoading, isProductError } =
    useAppSelector((s) => s.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductThunk());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h4" fontWeight={600}>
          Product Listing
        </Typography>
        <Button component={Link} to="/about" variant="outlined" size="small">
          About Page
        </Button>
      </Box>

      {isProductLoading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : isProductError ? (
        <Typography color="error" align="center" mt={5}>
          Something went wrong. Please try again.
        </Typography>
      ) : (
        <Grid container spacing={3}>
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
    </Container>
  );
}

export default Home;
