import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Card from "./Card";
import CartModal from "./CartModal";
import useSWR from "swr";
import AppContext from "../context/AppContext";

function FavouritesArea() {
  const {
    darkMode,
    isLoading,
    favouriteData,
    setFavouriteData,
    isFavourite,
    setIsFavourite,
    favouritesCount,
    setFavouritesCount,
    favourites,
    setFavourites,
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
            You dont have any favourite product yet
          </Typography>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {favouriteData?.map((item) => (
              <div style={{ flex: "30%" }}>
                <Card
                  key={item.id}
                  data={item}
                  setFavouriteData={setFavouriteData}
                />
              </div>
            ))}
          </div>
        )}
        <CartModal />
      </Box>
    </>
  );
}

export default FavouritesArea;
