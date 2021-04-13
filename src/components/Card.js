import React from "react";
import { Link } from "react-router-dom";
import { motion, useTransform, useViewportScroll } from "framer-motion";

const transition = { duration: 0.8, ease: [0.43, 0.24, -0.01, 0.92] };

function Card({ id, src, align, title, loc }) {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0, -350]);
  return (
    <motion.div className="card" style={{ flexDirection: align }}>
      <motion.section className="card__header" exit={{ opacity: 0 }}>
        <motion.h1
          initial={{ translateX: "-200%" }}
          animate={{ translateX: 0 }}
          transition={{ delay: 3, ...transition }}
          exit={{ translateX: "-200%" }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ translateX: "-100" }}
          animate={{ translateX: 0 }}
          transition={{ delay: 3, ...transition }}
          exit={{ translateX: "500%" }}
        >
          {loc}
        </motion.p>
      </motion.section>
      <Link to={id}>
        <motion.div
          className="card__frame"
          exit={{
            translateX: "1000px",
            transition: { duration: 1.5, delay: 0.3, ...transition },
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
