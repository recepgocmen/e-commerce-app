import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function CardComponent({
  data,
  addFavourite,
  idHandler,
  enableDeleteButton = false,
  addToCart,
  isFavourite,
  setIsFavourite,
}) {
  const { id, title, images, price, description } = data;

  const { selectedProductIds, setSelectedProductIds } = useContext(AppContext);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
    addFavourite(id);

    // Toggle the selected product's id
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(
        selectedProductIds.filter((productId) => productId !== id)
      );
    } else {
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };
  console.log("id from card working", id);

  return (
    <Card
      sx={{
        width: 345,
        height: 550,
        marginY: 4,
        position: "relative",
      }}
    >
      <CardMedia
        sx={{
          minWidth: 300,
          minHeight: 300,
        }}
        component="img"
        height="50"
        image={images[0]}
        alt={`product ${id} image`}
        onClick={() => idHandler(id)}
      />
      <CardHeader
        action={
          <div>
            <IconButton
              aria-label="add to favourites"
              onClick={() => {
                if (selectedProductIds.includes(id)) {
                  setSelectedProductIds(
                    selectedProductIds.filter((productId) => productId !== id)
                  );
                } else {
                  setSelectedProductIds([...selectedProductIds, id]);
                }
                addFavourite(id);
              }}
            >
              <FavoriteIcon
                color={selectedProductIds.includes(id) ? "error" : "inherit"}
              />
            </IconButton>
          </div>
        }
        sx={{ textAlign: "left" }}
        title={title}
        subheader={`price: $${price}`}
      />

      <CardContent
        sx={{
          minHeight: 60,
          textAlign: "left",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{ position: "absolute", bottom: 0, right: 0 }}
      >
        <IconButton aria-label="add to cart" onClick={() => addToCart(id)}>
          <ShoppingCartIcon />
          <Typography variant="button" display="inline">
            Add to Cart
          </Typography>
        </IconButton>
        {enableDeleteButton && (
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
