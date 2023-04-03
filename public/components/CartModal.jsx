import Modal from "@mui/material/Modal";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const CartModal = () => {
  const { isOpen, handleClose, setIsOpen, toggleModal } =
    useContext(AppContext);

  const cartItems = [];

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
          top: "18%",
          left: "85%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: "400px",
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" mb={2}>
          Shopping Cart
        </Typography>
        {cartItems?.length === 0 ? (
          <Typography id="modal-description" variant="body1" mb={2}>
            Your cart is empty.
          </Typography>
        ) : (
          cartItems.map((item) => (
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
