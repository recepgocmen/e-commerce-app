import {
  Box,
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: 1200, // double the original width
          height: 550,
          marginY: 4,
          position: "relative",
          display: "flex", // use flexbox to align CardMedia and CardContent
        }}
      >
        <CardMedia
          sx={{
            minWidth: 300,
            minHeight: 550,
            flex: 1, // set flex property to 1 to take up remaining space
          }}
          component="img"
          height="50"
          image={images[0]}
          alt={`product ${id} image`}
        />
        <CardContent sx={{ flex: 1 }}>
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

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>

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
        </CardContent>
      </Card>
    </Box>
  );
}
