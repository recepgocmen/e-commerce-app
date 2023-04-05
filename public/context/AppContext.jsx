import { createContext, useState } from "react";
import useSWR from "swr";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [favouritesCount, setFavouritesCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteData, setFavouriteData] = useState([]);
  const [id, setId] = useState(1);

  const fetcher = () =>
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => data.products);

  const { data, isLoading } = useSWR(
    "https://dummyjson.com/api/products",
    fetcher
  );

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const addToCart = (id) => {
    const selectedCart = allData?.filter((item) => item.id === id);
    setCartData({ cartData, ...selectedCart });
    setCartCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = (item) => {
    setCartData(cartData.filter((i) => i.id !== item.id));
    setCartCount((prevCount) => prevCount - 1);
  };

  const addToFavourites = (item) => {
    setFavourites([...favourites, item]);
    setFavouritesCount((prevCount) => prevCount + 1);
  };

  const removeFromFavourites = (item) => {
    setFavourites(favourites.filter((i) => i.id !== item.id));
    setFavouritesCount((prevCount) => prevCount - 1);
  };

  const value = {
    darkMode,
    setDarkMode,
    cartData,
    setCartData,
    addToCart,
    removeFromCart,
    favourites,
    addToFavourites,
    removeFromFavourites,
    cartCount,
    setCartCount,
    favouritesCount,
    setFavouritesCount,
    isOpen,
    setIsOpen,
    toggleModal,
    handleClose,
    data,
    isLoading,
    isFavourite,
    setIsFavourite,
    favouriteData,
    setFavouriteData,
    id,
    setId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
