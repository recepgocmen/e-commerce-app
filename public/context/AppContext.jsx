import { createContext, useState } from "react";
import useSWR from "swr";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [favouritesCount, setFavouritesCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteData, setFavouriteData] = useState([]);

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

  const addToCart = (item) => {
    setCart([...cart, item]);
    setCartCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = (item) => {
    setCart(cart.filter((i) => i.id !== item.id));
    setCartCount((prevCount) => prevCount - 1);
  };

  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
    setFavouritesCount((prevCount) => prevCount + 1);
  };

  const removeFromFavorites = (item) => {
    setFavorites(favorites.filter((i) => i.id !== item.id));
    setFavouritesCount((prevCount) => prevCount - 1);
  };

  const value = {
    darkMode,
    setDarkMode,
    cart,
    addToCart,
    removeFromCart,
    favorites,
    addToFavorites,
    removeFromFavorites,
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
