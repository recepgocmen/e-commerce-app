import React from "react";
import Navbar from "../public/components/Navbar";
import { AppProvider } from "../public/context/AppContext";

function favourites() {
  return (
    <>
      <AppProvider>
        <Navbar />
        <div>favourites</div>;
      </AppProvider>
    </>
  );
}

export default favourites;
