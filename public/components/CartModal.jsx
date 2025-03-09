import Modal from "@mui/material/Modal";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { Box, CardMedia } from "@mui/material";
import { Typography, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartModal = () => {
  const {
    isOpen,
    handleClose,
    cartData,
    setCartData,
    productCount,
    setProductCount,
    productQuantities,
    setProductQuantities,
    darkMode,
  } = useContext(AppContext);

  useEffect(() => {
    setProductQuantities(
      cartData.reduce((quantities, product) => {
        quantities[product.id] = productCount[product.id] || 1;
        return quantities;
      }, {})
    );
  }, [cartData, productCount]);

  const getSubtotal = (cartData, productQuantities) => {
    let subtotal = 0;
    cartData?.forEach((item) => {
      const itemQuantity = productQuantities[item.id] || 0;
      subtotal += item.price * (itemQuantity || 1);
    });
    return subtotal;
  };

  const subtotal = getSubtotal(cartData, productQuantities);

  const deleteItem = (id) => {
    const newCartData = cartData.filter((item) => item.id !== id);
    setCartData(newCartData);
    setProductQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[id];
      return newQuantities;
    });

    setProductCount((prevProductCount) => {
      const newProductCount = { ...prevProductCount };
      delete newProductCount[id];
      return newProductCount;
    });
  };

  const updateProductQuantity = (productId, newQuantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="cart-modal"
      aria-describedby="shopping cart items"
    >
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: "100%",
          maxWidth: "480px",
          bgcolor: darkMode ? "#1a1a1a" : "background.paper",
          boxShadow: "-4px 0 6px -1px rgba(0, 0, 0, 0.1)",
          p: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid",
            borderColor: darkMode ? "#333" : "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              color: darkMode ? "#fff" : "#111",
            }}
          >
            Shopping Cart ({cartData.length})
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {cartData.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 2,
                color: darkMode ? "#666" : "#666",
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: 48 }} />
              <Typography variant="h6">Your cart is empty</Typography>
              <Typography variant="body2">
                Add some products to your cart
              </Typography>
            </Box>
          ) : (
            cartData?.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 2,
                  borderRadius: 1,
                  bgcolor: darkMode ? "#222" : "#f8f9fa",
                  border: "1px solid",
                  borderColor: darkMode ? "#333" : "#e5e7eb",
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item?.images[0]}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      color: darkMode ? "#fff" : "#111",
                      mb: 0.5,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: darkMode ? "#999" : "#666",
                      mb: 1,
                    }}
                  >
                    ${item.price}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        updateProductQuantity(
                          item.id,
                          Math.max(0, productQuantities[item.id] - 1)
                        )
                      }
                      disabled={productQuantities[item.id] === 0}
                      sx={{
                        bgcolor: darkMode ? "#333" : "#e5e7eb",
                        "&:hover": {
                          bgcolor: darkMode ? "#444" : "#d1d5db",
                        },
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>

                    <Typography
                      sx={{ mx: 1, color: darkMode ? "#fff" : "#111" }}
                    >
                      {productQuantities[item.id]}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() =>
                        updateProductQuantity(
                          item.id,
                          productQuantities[item.id] + 1
                        )
                      }
                      sx={{
                        bgcolor: darkMode ? "#333" : "#e5e7eb",
                        "&:hover": {
                          bgcolor: darkMode ? "#444" : "#d1d5db",
                        },
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>

                    <Box sx={{ flex: 1 }} />

                    <IconButton
                      size="small"
                      onClick={() => deleteItem(item.id)}
                      sx={{
                        color: "error.main",
                        "&:hover": {
                          bgcolor: darkMode
                            ? "rgba(244, 67, 54, 0.1)"
                            : "rgba(244, 67, 54, 0.1)",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>

        {cartData.length > 0 && (
          <Box
            sx={{
              p: 3,
              borderTop: "1px solid",
              borderColor: darkMode ? "#333" : "#e5e7eb",
              bgcolor: darkMode ? "#1a1a1a" : "#fff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: darkMode ? "#fff" : "#111" }}
              >
                Subtotal (
                {Object.values(productQuantities).reduce((a, b) => a + b, 0)}{" "}
                items)
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: darkMode ? "#fff" : "#111", fontWeight: 600 }}
              >
                ${subtotal}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: darkMode ? "#2563eb" : "#2563eb",
                color: "#fff",
                py: 1.5,
                "&:hover": {
                  bgcolor: darkMode ? "#1d4ed8" : "#1d4ed8",
                },
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CartModal;
