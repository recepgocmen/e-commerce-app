import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Card from "../components/Card";
import CartModal from "../components/CartModal";
import useSWR from "swr";
import AppContext from "../context/AppContext";

function MainArea() {
  const {
    setFavouriteData,
    favouriteData,
    setFavouritesCount,
    darkMode,
    setCartData,
    cartData,
    setCartCount,
    isFavourite,
    setIsFavourite,
    setId,
    id,
    addFavourite,
  } = useContext(AppContext);

  const router = useRouter();

  const idHandler = (id) => {
    setId(id);
    router?.push(`/${id}`);
  };

  //fetching data from api with SWR
  const fetcher = () =>
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => data?.products);

  const { data, isLoading } = useSWR(
    "https://dummyjson.com/api/products",
    fetcher
  );

  function addToCart(id) {
    const selectedProduct = data.find((item) => item.id === id);

    // Check if the product is already in the cart
    const isInCart = cartData.some((item) => item.id === selectedProduct.id);

    if (!isInCart) {
      setCartData((prevCartData) => [...prevCartData, selectedProduct]);
      setCartCount((prevCount) => prevCount + 1);
    }
  }

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          paddingX: 12,
          backgroundColor: darkMode ? "black" : "white",
        }}
      >
        <Typography
          variant="h3"
          sx={{ paddingY: 4 }}
          color={darkMode ? "white" : "black"}
        >
          Welcome to BuyMe
        </Typography>
        {isLoading && (
          <Typography
            variant="h5"
            sx={{ color: "red", textAlign: "center", margin: "24px" }}
          >
            Loading...
          </Typography>
        )}
        {/* Card display area that coming from api  */}
        {data && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {data?.map((item) => (
              <div style={{ flex: "30%" }}>
                <Card
                  key={item.id}
                  data={item}
                  addFavourite={addFavourite}
                  isFavourite={isFavourite}
                  setIsFavourite={setIsFavourite}
                  addToCart={addToCart}
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
