import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Card from "../components/Card";
import CartModal from "../components/CartModal";
import useSWR from "swr";

function MainArea() {
  const fetcher = () =>
    fetch("https://dummyjson.com/products").then((res) => res.json());

  const { data, isLoading } = useSWR(
    "https://dummyjson.com/api/products",
    fetcher
  );

  console.log(data);
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" color="text.secondary" className="mt-12">
          Welcome to BuyMe
        </Typography>
      </Box>
      {isLoading ? (
        <Typography
          variant="h5"
          sx={{ color: "red", textAlign: "center", margin: "24px" }}
        >
          Loading...
        </Typography>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data?.products?.map((item) => (
            <div style={{ flex: "33.33%" }}>
              <Card key={item.id} data={item} />
            </div>
          ))}
        </div>
      )}
      <CartModal />
    </>
  );
}

export default MainArea;
