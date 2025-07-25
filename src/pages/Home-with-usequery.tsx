import "../App.css";
import { Link } from "react-router";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Pagination,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchproductList } from "../api/functions/product.api";
import { useState } from "react";
import { getCategoryList } from "../api/functions/category.api";
import useDebounce from "../hooks/useDebounce";

function HomeWithUseQuery() {
  // use query hook use korbo

  const [count, setCount] = useState(0);
  const [categoryId, setcategoryId] = useState<number|null>(null);
  const [offset, setOffset] = useState(0);

  const [search, setSearch] = useState("");
  const _debounceValue = useDebounce(search);

  const { data: categoryData } = useQuery({
    queryKey: ["category-list"],
    queryFn: getCategoryList,
  });

  const { data, isLoading, error, refetch, status } = useQuery({
    // search chnage holei api call ta abar hobe
    queryKey: ["product-list", count, _debounceValue, categoryId,offset],
    // axios fn ta akane pass kogit rte hbe
    queryFn: () =>
      fetchproductList({
        title: _debounceValue,
        ...(categoryId === null
          ? {}
          : {
              categoryId,
            }),
          limit:20,
          offset:offset*10
      }),
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

      <Button color="error" variant="contained" onClick={() => refetch()}>
        Cholo refetch kori
      </Button>

      <Button onClick={() => setCount((prev) => prev - 1)} variant="contained">
        Decrement - {count}
      </Button>
      <Button onClick={() => setCount((prev) => prev + 1)} variant="contained">
        Increment - {count}
      </Button>

      <Grid container spacing={2}>
        <Grid size={5}>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Searh products"
          />
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {categoryData?.map((value) => {
              return (
                <ListItem
                  key={value?.id}
                  disablePadding
                  onClick={() => setcategoryId(value.id)}
                  sx={{
                    background:
                      categoryId === value?.id ? "red" : "transparent",
                  }}
                >
                  <ListItemButton role={undefined} dense>
                    <ListItemText primary={value?.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>

        <Grid size={7} padding={1}>
          <h1>current page - {offset}</h1>
          <Grid size={12}>
            <Pagination
              count={10}
              page={offset}
              onChange={(e, pageNo) => setOffset(pageNo)}
            />
          </Grid>
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
                    title={item.title}
                    image={item.images[0]}
                    id={item.id}
                    category={item?.category?.name}
                    price={item.price}
                    description={item.description}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomeWithUseQuery;
