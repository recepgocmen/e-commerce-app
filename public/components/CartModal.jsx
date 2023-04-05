import Modal from "@mui/material/Modal";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const CartModal = () => {
  const { isOpen, handleClose, cartData } = useContext(AppContext);

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
          minWidth: "500px",
          minHeight: "500px",
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
          cartData?.map((item) => (
            <Box key={item.id} sx={{ display: "flex", mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                />
              </Box>
              <Box sx={{ flex: 3, pl: 2 }}>
                <Typography variant="body1">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.price}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Modal>
  );
};
export default CartModal;
