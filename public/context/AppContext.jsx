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
  const [productCount, setProductCount] = useState(0);
  const [productQuantities, setProductQuantities] = useState({});
  const [selectedProductIds, setSelectedProductIds] = useState([]);

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
    const selectedCart = data?.find((item) => item.id === id);

    if (!cartData.some((item) => item.id === id)) {
      setCartData([...cartData, selectedCart]);
    }

    // Update the product count in the AppContext
    setProductCount((prevProductCount) => ({
      ...prevProductCount,
      [id]: (prevProductCount[id] || 0) + 1,
    }));
  };

  const removeFromCart = (item) => {
    setCartData(cartData.filter((i) => i.id !== item.id));
    setCartCount((prevCount) => prevCount - 1);

    setProductCount((prevCount) => {
      const existingItemIndex = prevCount.findIndex(
        (countItem) => countItem.id === item.id
      );
      if (existingItemIndex >= 0) {
        const updatedItem = {
          ...prevCount[existingItemIndex],
          count: prevCount[existingItemIndex].count - 1,
        };
        const updatedCount = [
          ...prevCount.slice(0, existingItemIndex),
          updatedItem,
          ...prevCount.slice(existingItemIndex + 1),
        ];
        return updatedItem.count === 0
          ? updatedCount.filter((countItem) => countItem.id !== item.id)
          : updatedCount;
      } else {
        return prevCount;
      }
    });
  };

  function addFavourite(id) {
    const selectedProduct = data.find((item) => item.id === id);
    console.log("n", [selectedProduct, favouriteData]);
    let newFavouriteData = [...favouriteData];
    if (!newFavouriteData.includes(selectedProduct)) {
      console.log("here1");
      newFavouriteData.push(selectedProduct);
    } else if (newFavouriteData.includes(selectedProduct)) {
      console.log("hjere2");
      newFavouriteData = newFavouriteData.filter((item) => item.id !== id);
    }
    setFavouriteData(newFavouriteData);
    setFavouritesCount(newFavouriteData.length);
  }

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
    productCount,
    setProductCount,
    addFavourite,
    productQuantities,
    setProductQuantities,
    selectedProductIds,
    setSelectedProductIds,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
