import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Card from "../components/Card";
import CartModal from "../components/CartModal";
import useSWR from "swr";
import AppContext from "../context/AppContext";

function MainArea() {
  const { setFavouriteData, favouriteData, id, setId } = useContext(AppContext);
  const router = useRouter();
  const { detail } = router?.query;
  console.log(router);

  const fetcher = () =>
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => data?.products);

  const { data, isLoading } = useSWR(
    "https://dummyjson.com/api/products",
    fetcher
  );
  function addFavourite(id) {
    const itemToAdd = data.find((item) => item.id === id);
    if (!favouriteData.includes(itemToAdd)) {
      favouriteData.push(itemToAdd);
    } else if (favouriteData.includes(itemToAdd)) {
      favouriteData.filter((item) => item.id !== id);
    }
    setFavouriteData(favouriteData);
  }

  const idHandler = (id) => {
    setId(id);
    router?.push(`/${id}`);
  };

  return (
    <>
      <Box
        sx={{ textAlign: "center", paddingX: 12, backgroundColor: "orange" }}
      >
        <Typography variant="h5" sx={{ paddingY: 4 }}>
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
            {data?.map((item) => (
              <div style={{ flex: "30%" }}>
                <Card
                  key={item.id}
                  data={item}
                  addFavourite={addFavourite}
                  idHandler={idHandler}
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

export default MainArea;
