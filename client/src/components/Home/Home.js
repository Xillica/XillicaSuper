import React from "react";
import { Container, Grow } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";
import ConsoleTextAnimation from "./ConsoleTextAnimation"; // Import the ConsoleTextAnimation component
import "./styles.css";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "0px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "50px",
  height: "10px",
  textAlign: "center",
}));

const VideoPlayer = ({ videoSource }) => {
  return (
    <div className="video-container">
      <video src={videoSource} autoPlay loop className="video-element" />
    </div>
  )};

const Home = () => {
  return (
    <Container maxWidth="100%" style={{ marginTop: "150px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <ConsoleTextAnimation /> {/* Include the animation here */}
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <VideoPlayer videoSource="video1.mp4" />    
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
