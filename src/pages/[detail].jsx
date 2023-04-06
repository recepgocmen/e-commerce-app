import React, { useContext } from "react";
import Navbar from "../../public/components/Navbar";
import DetailedCard from "../../public/components/DetailedCard";
import AppContext from "../../public/context/AppContext";
import useSWR from "swr";

function Detail() {
  const { id } = useContext(AppContext);

  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("An error occurred while fetching the data.");
    }
    return response.json();
  };

  const { data, isLoading } = useSWR(
    `https://dummyjson.com/products/${id}`,
    fetcher
  );

  return (
    <div>
      <Navbar />
      {isLoading ? <div>Loading...</div> : <DetailedCard data={data} />}
    </div>
  );
}

export default Detail;
