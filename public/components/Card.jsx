import * as React from "react";
import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppContext from "../context/AppContext";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ data }) {
  const { id, title, images, price, description } = data;
  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 600,
      }}
    >
      <CardMedia
        sx={{
          maxWidth: 345,
          maxHeight: 300,
        }}
        component="img"
        height="50"
        image={images[0]}
        alt={`product ${id} image`}
      />
      <CardHeader
        action={
          <div>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </div>
        }
        title={title}
        subheader={`price: $${price}`}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to cart">
          <ShoppingCartIcon />
          <Typography variant="button" display="inline">
            Add to Cart
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}
