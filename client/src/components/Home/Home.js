import React, { useEffect, useState } from "react";
import { Container, Grow } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styled from "@mui/system/styled";
import "./styles.css";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(2),
  borderRadius: "50px",
  textAlign: "center",
}));

//Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  //console.log(user);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <Container maxWidth="100%" style={{ marginTop: "150px" }}>
      <Grow in>
        <Grid container spacing={2}>
          <Grid xs></Grid>
          <Grid xs={4}>
            <Item></Item>
          </Grid>
          <Grid xs={4}>
            <Item></Item>
          </Grid>
          <Grid xs></Grid>
        </Grid>
      </Grow>
    </Container>
  );
};

export default Home;
