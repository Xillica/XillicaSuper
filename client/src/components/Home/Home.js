import React, { useEffect, useState } from "react";
import { Container, Grow } from "@mui/material";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./styles.css";

//Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  //console.log(user);

  useEffect(() => {
    gsap.from(".head", { opacity: 0, duration: 2, y: 100 });
    gsap.from(".head .powered", { opacity: 0, duration: 2, delay: 0.3 });
    gsap.from(".head .logo-m", { opacity: 0, duration: 3, delay: 0.3, x: 100 });

    gsap.from(".content1", {
      opacity: 0,
      duration: 1.5,
      x: 100,
      scrollTrigger: {
        trigger: ".content1",
        start: "top 80%", // Start animation when 80% of the element is visible in the viewport
        end: "bottom 20%", // End animation when 20% of the element is still visible in the viewport
      },
    });
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <div>
      <Container maxWidth="100%">
        <Grow in>
          <Container className="postsContainer" maxWidth="100%">
            <section className="head">
              <div className="logo-m">X</div>
              <div>Xillica`Super</div>
              <div className="powered">Powered by Chipsey</div>
              <br />
              <div className="greeting">
                {user
                  ? `Nice to Have You Back, ${user?.result.name}.`
                  : "SignUp is Free! We are Waiting..."}
                <div className="userID">
                  {user && `MelodyMatrix ID : ${user?.result._id}.`}
                </div>
              </div>
            </section>
            <section className="content1"></section>
          </Container>
        </Grow>
      </Container>
    </div>
  );
};

export default Home;
