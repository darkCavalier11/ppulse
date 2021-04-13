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
    <motion.div className="home" initial={false}>
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
        transition={{ delay: 2.8, duration: 1, ease: ease }}
        onAnimationStart={() => {
          document.querySelector("body").style.overflow = "hidden";
        }}
        onAnimationComplete={() => {
          document.querySelector("body").style.overflow = "initial";
        }}
      >
        <Typed strings={["Here we go . . . "]} typeSpeed={50} className="home__typed"></Typed>
      </motion.div>
      <motion.div className="home__container">
        {data.map((item, idx) => (
          <Card
            key={idx}
            id={item.id}
            src={process.env.PUBLIC_URL + item.path}
            title={item.title}
            loc={item.loc}
            align={ window.innerWidth > 1440 && align[idx%2]}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Home;
