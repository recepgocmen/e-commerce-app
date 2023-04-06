import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function ButtonAppBar() {
  const {
    darkMode,
    setDarkMode,
    cartCount,
    favouritesCount,
    toggleModal,
    productQuantities,
  } = useContext(AppContext);

  return (
    <Box>
      <AppBar sx={{ backgroundColor: darkMode && "gray" }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">BuyMe</Link>
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={favouritesCount} color="error">
              <Link href="/favourites">
                <a>
                  <FavoriteIcon />
                  <Typography variant="srOnly">Favourites</Typography>
                </a>
              </Link>
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={toggleModal}>
            <Badge
              badgeContent={Object.values(productQuantities).reduce(
                (a, b) => a + b,
                0
              )}
              color="error"
            >
              <ShoppingCartIcon />
              <Typography variant="srOnly">Cart</Typography>
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
