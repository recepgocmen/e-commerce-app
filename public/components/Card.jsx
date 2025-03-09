import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Box,
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
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        marginY: 3,
        position: "relative",
        border: "1px solid #e5e7eb",
        backgroundColor: "#fafafa",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      }}
    >
      <Box
        sx={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}
      >
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
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 1,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          <FavoriteIcon
            color={selectedProductIds.includes(id) ? "error" : "inherit"}
          />
        </IconButton>
        <CardMedia
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
          component="img"
          image={images[0]}
          alt={`product ${id} image`}
          onClick={() => idHandler(id)}
        />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CardHeader
          sx={{
            textAlign: "left",
            pb: 0,
            pt: 1,
          }}
          title={
            <Typography
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.2em",
                maxHeight: "2.4em",
              }}
            >
              {title}
            </Typography>
          }
          subheader={`price: $${price}`}
        />

        <CardContent
          sx={{
            textAlign: "left",
            pt: 1,
            pb: "8px !important",
            flex: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "1.5em",
              maxHeight: "4.5em",
            }}
          >
            {description}
          </Typography>
        </CardContent>

        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
          }}
        >
          <IconButton
            aria-label="add to cart"
            onClick={() => addToCart(id)}
            size="small"
          >
            <ShoppingCartIcon fontSize="small" />
          </IconButton>
          {enableDeleteButton && (
            <IconButton aria-label="delete" size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </CardActions>
      </Box>
    </Card>
  );
}
