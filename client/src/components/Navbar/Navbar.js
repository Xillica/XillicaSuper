import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/system/Box";
import decode from "jwt-decode";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";

import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";

const mode = "light"; // Replace with your desired mode (either "dark" or "light")

const Item = styled(Link)(({ theme }) => ({
  border: "0px solid",
  borderColor: mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(6),
  borderRadius: "0px",
  textAlign: "center",
  letterSpacing: "1px",
  color: "#3D3B3A",
  textDecoration: "none",
  fontWeight: "500",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "color 0.3s", // Add color transition
  "&:hover": {
    color: "gray", // Change text color on hover
  },
}));

const IconItem = styled(Item)(({ theme }) => ({
  "&:hover .icon-text": {
    opacity: 1, // Show text on hover
  },
}));

const DropdownContent = styled("div")(({ theme }) => ({
  display: "none",
  position: "absolute",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  minWidth: "250px",
  zIndex: 1,
  top: "100px",
  opacity: 0,
  "&.show": {
    opacity: 1,
    display: "block", // Display the content when shown
  },
}));

const DropdownItem = styled("div")(({ theme }) => ({
  padding: "12px 16px",
  textDecoration: "none",
  display: "block",
  borderRadius: "10px",
  border: "0.1px solid",
  marginTop: "5px",

  color: "black",
  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
}));

const ProfileContainer = styled("div")(({ theme }) => ({
  position: "relative", // Ensure the container is relatively positioned
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //console.log(user);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });

    navigate("/");
    setUser(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;

    //jwt
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [logout, user?.token]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }} style={{ position: "fixed", top: "0" }} className="navbar">
      <div className="navBack"></div>
      {user ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 16, md: 24 }}
        >
          <Grid xs={4} sm={4}>
            <Item></Item>
          </Grid>
          <Grid xs={2} sm={4}>
            <Item to="/explore">
              <img
                src="mainlogo.png"
                alt="XillicaLogo"
                width="100%"
                style={{ marginTop: "-35%" }}
              />
            </Item>
          </Grid>
          <Grid xs={2} sm={4}>
            <Item to="/explore">
              <ExploreIcon style={{ marginRight: "5px", color: "black" }} />
              <span className="icon-text">EXPLORE</span>
            </Item>
          </Grid>
          <Grid xs={2} sm={2}>
            <Item to="cart">
              <ShoppingCartIcon
                style={{ marginRight: "5px", color: "black" }}
              />
              <span className="icon-text">CART</span>
            </Item>
          </Grid>
          <Grid xs={2} sm={8}>
            <ProfileContainer>
              <IconItem onClick={toggleDropdown}>
                <AccountCircleIcon
                  style={{ marginRight: "5px", color: "black" }}
                />
                <span
                  className="icon-text"
                  style={{ textTransform: "uppercase" }}
                >
                  {user?.result.name}'s Profile
                </span>
                {!isDropdownOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                <DropdownContent className={isDropdownOpen ? "show" : ""}>
                  <Link to="profile" style={{ textDecoration: "none" }}>
                    <DropdownItem>Profile</DropdownItem>
                  </Link>
                  <DropdownItem>Orders</DropdownItem>
                  <DropdownItem onClick={logout}>Logout</DropdownItem>
                </DropdownContent>
              </IconItem>
            </ProfileContainer>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 8, sm: 16, md: 24 }}
        >
          <Grid xs={2} sm={4}>
            <Item></Item>
          </Grid>
          <Grid xs={2} sm={4}>
            <Item to="/explore">
              <img
                src="mainlogo.png"
                alt="XillicaLogo"
                width="100%"
                style={{ marginTop: "-35%" }}
              />
            </Item>
          </Grid>
          <Grid xs={2} sm={4}>
            <Item to="/explore">
              <ExploreIcon style={{ marginRight: "5px", color: "black" }} />
              <span className="icon-text">EXPLORE</span>
            </Item>
          </Grid>
          <Grid xs={2} sm={4}>
            <Item to="/auth">
              <LoginIcon style={{ marginRight: "5px", color: "black" }} />
              <span className="icon-text">SIGNUP/SIGNIN</span>
            </Item>{" "}
          </Grid>
          <Grid xs={2} sm={4}>
            <Item to="/auth">
              <InfoIcon style={{ marginRight: "5px", color: "black" }} />
              <span className="icon-text">INFO</span>
            </Item>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Navbar;
