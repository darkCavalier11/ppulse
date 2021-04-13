import React, { useEffect, useState, useRef } from "react";
import data from "./data.json";
import { LoremIpsum } from "react-lorem-ipsum";
import { motion, useTransform, useViewportScroll } from "framer-motion";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

function Details(props) {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.2]);
  const posY = useTransform(scrollYProgress, [0, 0.8], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const path = props.match.params.id;
  const place = data.filter((item) => item.id == path)[0];
  const firstHeader = place.title.substr(0, place.title.length / 2).split("");
  const lastHeader = place.title.substr(place.title.length / 2).split("");

  // Mapbox configuration

  const [long, setLong] = useState(place.long);
  const [lat, setLat] = useState(place.lat);
  const mapContainer = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic3VtaXRjIiwiYSI6ImNranJnbHM1MzF2OXQzMGw5OGV6MjlhZmsifQ.BXCa4SwcK7YtoVXdIVq9UQ";
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [long, lat],
      zoom: 9,
    });
    return () => map.remove();
  }, []);

  const gMapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;

  return (
    <motion.div
      className="details"
      onLoad={() => {
        // Link un-necessary behanvior
        document.documentElement.scrollTop = 0;
        document.body.style.overflowX = "hidden";
        document.body.scrollTop = 0;
      }}
      initial={{x: "500%"}}
      animate={{x: 0, transition: transition}}
      exit='exit'
    >
      <motion.header className="details__header">
        <motion.span className="details__headerF">
          {firstHeader.map((item, idx) => (
            <motion.span
              className="letters"
              key={idx}
              initial={{ y: 100 }}
              animate={{
                y: 0,
                transition: {
                  duration: 1,
                  ...transition,
                  delay: 1.4 + (firstHeader.length - idx) * 0.1,
                },
              }}
            >
              {item} &nbsp;
            </motion.span>
          ))}
        </motion.span>
        <motion.span className="details__headerS">
          {lastHeader.map((item, idx) => (
            <motion.span
              className="letters"
              key={idx}
              initial={{ y: 100 }}
              animate={{
                y: 0,
                transition: { duration: 1, ...transition, delay: 1.4 + idx * 0.1 },
              }}
            >
              {item} &nbsp;
            </motion.span>
          ))}
        </motion.span>
      </motion.header>
      <div className="details__frame">
        <motion.img
          src={process.env.PUBLIC_URL + place.path}
          initial={{ y: -500 }}
          style={{ scale: scale }}
        ></motion.img>
      </div>
      <motion.div
        className="details__text"
        style={{ y: posY, opacity: opacity }}
      >
        <h1>A gentle Introduction</h1>
        <LoremIpsum p={5} />
      </motion.div>
      <div className="details__container">
        <a href={gMapUrl} target="blank" className="details__gmap">
          Visit Map &rarr;
        </a>
        <div ref={mapContainer} className="details__map"></div>
      </div>
    </motion.div>
  );
}

export default Details;
