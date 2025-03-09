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
      <AppBar
        position="static"
        sx={{
          background: darkMode
            ? "linear-gradient(to right, #1e1e1e, #2d2d2d)"
            : "linear-gradient(to right, #2563eb, #3b82f6)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              background: darkMode
                ? "linear-gradient(to right, #fff, #e5e7eb)"
                : "linear-gradient(to right, #fff, #f3f4f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <Link href="/">TrendMart</Link>
          </Typography>

          <IconButton
            color="inherit"
            sx={{
              ml: 1,
              "&:hover": {
                transform: "scale(1.1)",
                transition: "transform 0.2s",
              },
            }}
          >
            <Badge badgeContent={favouritesCount} color="error">
              <Link href="/favourites">
                <FavoriteIcon />
              </Link>
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={toggleModal}
            sx={{
              ml: 1,
              "&:hover": {
                transform: "scale(1.1)",
                transition: "transform 0.2s",
              },
            }}
          >
            <Badge
              badgeContent={Object.values(productQuantities).reduce(
                (a, b) => a + b,
                0
              )}
              color="error"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              ml: 1,
              "&:hover": {
                transform: "scale(1.1)",
                transition: "transform 0.2s",
              },
            }}
          >
            {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
