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
import { useState } from "react";

export default function RecipeReviewCard({ data, addFavourite }) {
  const { id, title, images, price, description } = data;
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <Card
      sx={{
        width: 345,
        height: 550,
        marginY: 4,
        position: "relative", // Add position relative to the card container
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
      />
      <CardHeader
        action={
          <div>
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                setIsFavourite(!isFavourite);
                addFavourite(id);
              }}
            >
              <FavoriteIcon color={isFavourite ? "error" : "inherit"} />
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
        <IconButton aria-label="add to cart">
          <ShoppingCartIcon />
          <Typography variant="button" display="inline">
            Add to Cart
          </Typography>
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
