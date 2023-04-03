import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [favouritesCount, setFavouritesCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
