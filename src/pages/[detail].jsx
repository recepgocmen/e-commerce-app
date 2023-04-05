import React, { useContext } from "react";
import Navbar from "../../public/components/Navbar";
import DetailedCard from "../../public/components/DetailedCard";
import AppContext from "../../public/context/AppContext";
import useSWR from "swr";

function Detail() {
  const { id } = useContext(AppContext);

  const fetcher = () =>
    fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json());

  const { data, isLoading } = useSWR(
    `https://dummyjson.com/products/`,
    fetcher
  );

  return (
    <div>
      <Navbar />
      {data && <DetailedCard data={data} />}
    </div>
  );
}

export default Detail;
