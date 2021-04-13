import React from "react";
import { Avatar, fullname } from "react-lorem-ipsum";
import { motion } from "framer-motion";
function Header() {
  return (
    <>
      <motion.header className="header" id="header">
        <section className="header__left">
          <h1>The Majestic places of India</h1>
          <p> By {fullname()}</p>
          <span>{new Date().toDateString()}</span>
        </section>
        <nav>
          <Avatar className="header__avatar" />
        </nav>
      </motion.header>
    </>
  );
}

export default Header;
