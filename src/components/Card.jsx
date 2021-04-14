import React from "react";
import { Link } from "react-router-dom";
import { motion, useTransform, useViewportScroll } from "framer-motion";

const transition = { duration: 0.8, ease: [0.43, 0.24, -0.01, 0.92] };

function Card({ id, src, align, title, loc, n }) {
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(
    scrollYProgress,
    [n / 12, n / 7, (n + 1) / 7],
    [0, 1, 0]
  );
  const posY = useTransform(scrollYProgress, [n/7, (n+1)/7], [0, -1200]);
  return (
    <motion.div
      className="card"
      style={{ flexDirection: align, opacity: opacity, y: posY }}
    >
      <motion.section className="card__header" exit={{opacity: 0 }}>
        <motion.h1
          initial={{ translateX: "-200%" }}
          animate={{ translateX: 0 }}
          transition={{ delay: 3, ...transition }}
          exit={{ translateX: "-200%", transition: {delay: 0.3} }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ translateX: "-100" }}
          animate={{ translateX: 0 }}
          transition={{ delay: 3, ...transition }}
          exit={{ translateX: "500%", transition: {delay: 0.3} }}
        >
          {loc}
        </motion.p>
      </motion.section>
      <Link to={id}>
        <motion.div
          className="card__frame"
          exit={{
            translateX: "1000px",
            transition: { duration: 0.5, delay: 0.3, ...transition },
          }}
        >
          <motion.img
            style={{ width: window.innerWidth > 1440 ? 1000 : 450 }}
            src={src}
            initial={{ scale: 1 }}
            transition={transition}
            whileHover={{ scale: 1.1 }}
            exit={{ opacity: 0 }}
          ></motion.img>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default Card;
