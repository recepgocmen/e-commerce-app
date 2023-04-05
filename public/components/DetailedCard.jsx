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
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function RecipeReviewCard({ data }) {
  const {
    isFavourite,
    setIsFavourite,
    addFavourite,
    productCount,
    setProductCount,
    addToCart,
    darkMode,
  } = useContext(AppContext);
  const { id, title, images, price, description } = data;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: darkMode ? "black" : "white",
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
            sx={{ textAlign: "left" }}
            title={title}
            subheader={`price: $${price}`}
          />

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", position: "relative" }}
          >
            <IconButton
              onClick={() =>
                setProductCount((productCount) => productCount - 1)
              }
              disabled={productCount === 0}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6" mx={2}>
              {productCount}
            </Typography>
            <IconButton
              onClick={() =>
                setProductCount((productCount) => productCount + 1)
              }
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              margin: "10px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" mr={1}>
                Total:
              </Typography>
              <Typography variant="h6">{`$ ${
                price * productCount
              }`}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => addToCart(id)}
                aria-label="add to cart"
              >
                <ShoppingCartIcon />
              </IconButton>
              <IconButton
                aria-label="add to favourites"
                onClick={() => {
                  setIsFavourite(!isFavourite);
                  addFavourite(id);
                }}
              >
                <FavoriteIcon color={isFavourite ? "error" : "inherit"} />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
