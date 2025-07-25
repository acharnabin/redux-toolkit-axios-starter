import {

  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,

  Tooltip,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import {
  addItemToCart,
  removeFromCart,
} from "../redux-toolkit/slices/product.slice";
import { useMemo } from "react";

interface IProductCardProps {
  title: string;
  id: number;
  image: string;
  price: number;
  description: string;
  category: string;
 
}

const ProductCard = ({
  title,
  image,
  price,
  description,
  category,
 
  id,
}: IProductCardProps) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((s) => s.product);

  const isItemAlreadyAddedToCart = useMemo(() => {
    const item = cartItems.find((item) => item?.id === id);
    console.log(item, "item");

    return Boolean(item);
  }, [id, cartItems]);

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        category,
        description,
        id,
        image,
        price,
        title,
        rating: {
          rate,
          count,
        },
      })
    );
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
  };
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{ objectFit: "contain", p: 2 }}
      />
      <CardContent>
        <Chip label={category} sx={{ mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="subtitle1" color="primary" gutterBottom>
          ₹{price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        {isItemAlreadyAddedToCart ? (
          <Button
            onClick={handleRemoveFromCart}
            size="small"
            variant="outlined"
            color="error"
          >
            Remove
          </Button>
        ) : (
          <Tooltip title="Ata te add to cart hoi">
            <Button
              onClick={handleAddToCart}
              size="small"
              variant="contained"
              color="primary"
            >
              Add to Cart
            </Button>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
