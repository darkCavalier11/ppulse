import React from "react";
import Card from "../components/Card";
import data from "./data.json";
import { motion } from "framer-motion";
import Typed from "react-typed";

const ease = [0.23, 0.42, -0.01, 0.93];

const align = {
  0: "row",
  1: "row-reverse",
};

function Home() {
  return (
    <motion.div className="home" transition={{ delay: 6, duration: 5 }}>
      <motion.div
        className="home__screen"
        initial={{
          overflow: "hidden",
          position: "absolute",
          height: "100vh",
          width: "100vw",
          zIndex: 555,
          top: 0,
          left: 0,
        }}
        animate={{ height: 0 }}
        transition={{ delay: 3, duration: 1, ease: ease }}
        onAnimationStart={() => {
          document.querySelector("body").style.overflow = "hidden";
          document.querySelector(".home__container").style.display = "none";
          document.querySelector(".header").style.display = "none";

        }}
        onAnimationComplete={() => {
          document.querySelector("body").style.overflow = "initial";
          document.querySelector(".home__container").style.display = "";
          document.querySelector(".header").style.display = "flex";

        }}
      >
        <Typed strings={["Here we go . . . "]} typeSpeed={110}></Typed>
      </motion.div>
      <motion.div className="home__container">
        {data.map((item, idx) => (
          <Card
            key={idx}
            id={item.id}
            src={process.env.PUBLIC_URL + item.path}
            title={item.title}
            loc={item.loc}
            align={align[idx % 2]}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Home;
