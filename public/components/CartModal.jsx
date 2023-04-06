import Modal from "@mui/material/Modal";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { Box, CardMedia } from "@mui/material";
import { Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

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

  useEffect(() => {
    setProductQuantities(
      cartData.reduce((quantities, product) => {
        quantities[product.id] = productCount[product.id] || 1;
        return quantities;
      }, {})
    );
  }, [cartData, productCount]);

  const deleteItem = (id) => {
    const newCartData = cartData.filter((item) => item.id !== id);
    setCartData(newCartData);
    setProductQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[id];
      return newQuantities;
    });

    // Update the product count in the AppContext
    setProductCount((prevProductCount) => {
      const newProductCount = { ...prevProductCount };
      delete newProductCount[id];
      return newProductCount;
    });
  };

  const updateProductQuantity = (id, quantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: quantity,
    }));

    // Update the product count in the AppContext
    setProductCount((prevProductCount) => ({
      ...prevProductCount,
      [id]: quantity,
    }));

    if (quantity === 0) {
      deleteItem(id);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "8%",
          right: "5%",
          backgroundColor: "white",
          boxShadow: 24,
          p: 4,
          minWidth: "700px",
          minHeight: "700px",
          overflow: "scroll",
          maxHeight: "80vh",
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          mb={2}
          color={"black"}
        >
          Shopping Cart
        </Typography>

        {cartData.length === 0 ? (
          <Typography
            id="modal-description"
            variant="body1"
            mb={2}
            color="black"
          >
            Your cart is empty.
          </Typography>
        ) : (
          <>
            {cartData?.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  mb: 4,
                  border: "1px solid black",
                  color: "black",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <CardMedia
                    sx={{
                      minWidth: 100,
                      minHeight: 200,
                    }}
                    component="img"
                    height="50"
                    image={item?.images[0]}
                    alt={`product image`}
                  />
                </Box>
                <Box sx={{ flex: 3, pl: 4, position: "relative", width: 80 }}>
                  <Typography variant="h6" mb={2}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" mb={2}>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() =>
                        updateProductQuantity(
                          item.id,
                          Math.max(0, productQuantities[item.id] - 1)
                        )
                      }
                      disabled={productQuantities[item.id] === 0}
                    >
                      <RemoveIcon />
                    </IconButton>

                    <Typography variant="h6" mx={2}>
                      {productQuantities[item.id]}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        updateProductQuantity(
                          item.id,
                          productQuantities[item.id] + 1
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>

                    <Box sx={{ position: "absolute", right: 0, bottom: 0 }}>
                      <Typography variant="h6" mb={2}>
                        {`$ ${item.price * productQuantities[item.id]}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}

            <Box
              sx={{
                border: "1px solid black",
                fontSize: "0.8rem",
                px: "2rem",
                my: "2rem",
              }}
            >
              <Typography variant="body1" component="p" mb={2} color={"black"}>
                Order Summary
              </Typography>
              <Typography variant="body1" component="p" mb={2} color={"black"}>
                Subtotal (
                {Object.values(productQuantities).reduce((a, b) => a + b, 0)}{" "}
                item) : {` $${subtotal}`}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <IconButton
                  sx={{
                    border: "1px solid black",
                    fontSize: "0.8rem",
                    borderRadius: 2,
                    m: "1rem",
                  }}
                >
                  Proceed to checkout
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CartModal;
