import React, { useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Card from "./Card";
import CartModal from "./CartModal";
import AppContext from "../context/AppContext";

function FavouritesArea() {
  const {
    darkMode,
    isLoading,
    favouriteData,
    setFavouriteData,
    addFavourite,
    isFavourite,
    setIsFavourite,
    addToCart,
    idHandler,
  } = useContext(AppContext);

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          paddingX: 12,
          backgroundColor: darkMode ? "black" : "white",
        }}
      >
        <Typography variant="h3">Favourites</Typography>
        {isLoading ? (
          <Typography
            variant="h5"
            sx={{ color: "red", textAlign: "center", margin: "24px" }}
          >
            Loading...
          </Typography>
        ) : favouriteData.length === 0 ? (
          <Typography
            sx={{
              paddingTop: 40,
              minHeight: 850,
              color: darkMode ? "white" : "red",
            }}
          >
            You don't have any favourite product yet
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {favouriteData?.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  data={item}
                  setFavouriteData={setFavouriteData}
                  addFavourite={addFavourite}
                  isFavourite={isFavourite}
                  setIsFavourite={setIsFavourite}
                  addToCart={addToCart}
                  idHandler={idHandler}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <CartModal />
      </Box>
    </>
  );
}

export default FavouritesArea;
