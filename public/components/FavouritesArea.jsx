import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Card from "./Card";
import CartModal from "./CartModal";
import useSWR from "swr";
import AppContext from "../context/AppContext";

function FavouritesArea() {
  const { data, isLoading, favouriteData, setFavouriteData } =
    useContext(AppContext);
  console.log("favourite data", favouriteData);
  // console.log(data);
  return (
    <>
      <Box sx={{ textAlign: "center", paddingX: 12, backgroundColor: "blue" }}>
        <Typography variant="h5" className={{ marginY: 4 }}>
          Welcome to BuyMe
        </Typography>
        {isLoading ? (
          <Typography
            variant="h5"
            sx={{ color: "red", textAlign: "center", margin: "24px" }}
          >
            Loading...
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
