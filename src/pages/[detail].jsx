import React, { useContext } from "react";
import Navbar from "../../public/components/Navbar";
import DetailedCard from "../../public/components/DetailedCard";
import AppContext from "../../public/context/AppContext";
import useSWR from "swr";

function Detail() {
  const {
    id,
    isFavourite,
    setIsFavourite,
    addFavourite,
    productCount,
    setProductCount,
  } = useContext(AppContext);

  const fetcher = () =>
    fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json());

  const { data, isLoading } = useSWR(
    `https://dummyjson.com/products/`,
    fetcher
  );

  return (
    <div>
      <Navbar />
      {data && (
        <DetailedCard
          data={data}
          isFavourite={isFavourite}
          setIsFavourite={setIsFavourite}
          addFavourite={addFavourite}
          productCount={productCount}
          setProductCount={setProductCount}
        />
      )}
    </div>
  );
}

export default Detail;
