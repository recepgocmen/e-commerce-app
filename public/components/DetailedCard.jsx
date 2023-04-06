import {
  Box,
  Card,
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
import { useContext, useState } from "react";
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
    selectedProductIds,
    setSelectedProductIds,
    id,
  } = useContext(AppContext);
  const { title, images, price, description } = data;

  console.log("id from card detailed buggy", id);

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
          width: 1200,
          height: 550,
          marginY: 4,
          position: "relative",
          display: "flex",
        }}
      >
        <CardMedia
          sx={{
            minWidth: 300,
            minHeight: 550,
            flex: 1,
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
                onClick={() => addToCart(selectedProductIds)}
                aria-label="add to cart"
              >
                <ShoppingCartIcon />
              </IconButton>
              <IconButton
                aria-label="add to favourites"
                onClick={() => {
                  setIsFavourite(!isFavourite);
                  handleFavourite();
                }}
              >
                <FavoriteIcon
                  color={selectedProductIds.includes(id) ? "error" : "inherit"}
                />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
