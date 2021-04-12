import React from "react";
import data from "./data.json";
import { loremIpsum } from "react-lorem-ipsum";
import { motion } from "framer-motion";

const ease = [0.23, 0.42, -0.01, 0.93];

function Details(props) {
  const path = props.match.params.id;
  const place = data.filter((item) => item.id == path)[0];
  return (
    <motion.div className="details">
      <header className="details__header">{place.title}</header>
      <div className="details__frame">
        <img src={process.env.PUBLIC_URL + place.path}></img>
      </div>
      <div className="details__map"></div>
    </motion.div>
  );
}

export default Details;
