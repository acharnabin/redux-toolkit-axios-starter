import "../App.css";
import { Link } from "react-router";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Container,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchproductList } from "../api/functions/product.api";
import { useState } from "react";

function HomeWithUseQuery() {
  // use query hook use korbo

  const [count,setCount]=useState(0)

  const { data, isLoading, error,refetch ,status} = useQuery({
    //
    queryKey: ["product-list",count],
    // axios fn ta akane pass korte hbe
    queryFn: fetchproductList,
    // enbled
    // enabled:count>3
  });



  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        mb={2}
      >
        <Typography variant="h4" fontWeight={600}>
          Product Listing with useQuery -{status}
        </Typography>
        
        <Button component={Link} to="/about" variant="outlined" size="small">
          About Page
        </Button>
      </Box>

      <Button color='error' variant="contained" onClick={()=>refetch()}>
        Cholo refetch kori
      </Button>

      <Button onClick={()=>setCount(prev=>prev-1)} variant="contained">
          Decrement - {count}
        </Button>
        <Button onClick={()=>setCount(prev=>prev+1)} variant="contained">
          Increment - {count}
        </Button>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" mt={5}>
          Something went wrong. Please try again.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {data?.map((item) => (
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

export default HomeWithUseQuery;
