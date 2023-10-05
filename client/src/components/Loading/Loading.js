import React from "react";
import { Container, Grow } from "@mui/material";
import "./styles.css";

const Loading = () => {
  return (
    <Container
      fullWidth
      style={{
        marginTop: "200px",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
      }}
      className="loading-background"
    >
      <Grow in>
        <div>
          <img
            src="https://res.cloudinary.com/dq8e751ni/image/upload/v1696230145/mn3vqsth2jmtasynvyyk.png"
            alt="Loading"
            width="20%"
          />
          <h3>Loading...</h3>
        </div>
      </Grow>
    </Container>
  );
};

export default Loading;
