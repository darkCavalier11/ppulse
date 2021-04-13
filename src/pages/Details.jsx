import React, { useEffect, useState, useRef } from "react";
import data from "./data.json";
import { LoremIpsum } from "react-lorem-ipsum";
import { motion, useTransform, useViewportScroll } from "framer-motion";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

function Details(props) {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const scaleMap = useTransform(scrollYProgress, [0.5, 1], [1, 1.3]);
  
  const posY = useTransform(scrollYProgress, [0, 0.3], [200, -200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 0]);
  const opacityMap = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const opacityImg = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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
      initial={{ x: "500%" }}
      animate={{ x: 0, transition: transition }}
      exit="exit"
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
                transition: {
                  duration: 1,
                  ...transition,
                  delay: 1.4 + idx * 0.1,
                },
              }}
            >
              {item} &nbsp;
            </motion.span>
          ))}
        </motion.span>
      </motion.header>
      <motion.div className="details__frame" style={{ opacity: opacityImg }}>
        <motion.img
          src={process.env.PUBLIC_URL + place.path}
          initial={{ y: -500 }}
          style={{ scale: scale }}
        ></motion.img>
      </motion.div>
      <motion.div
        className="details__text"
        style={{ y: posY, opacity: opacityText }}
      >
        <h1>A gentle Introduction</h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget
        laoreet lorem. Praesent leo ex, auctor id viverra vel, congue quis
        massa. Aenean purus dolor, consectetur ac magna id, laoreet semper nunc.
        Suspendisse potenti. Sed iaculis hendrerit mauris in tincidunt. Nullam
        cursus sem nisl. Pellentesque tincidunt tincidunt eros vitae efficitur.
        Ut consectetur elit id risus dictum, nec gravida mi faucibus. Orci
        varius natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Ut erat leo, sagittis eu auctor ut, lobortis nec mi.
        Fusce lobortis risus non odio finibus, non tempus quam lobortis. Nunc
        sed convallis quam, id tempor tortor. Quisque luctus metus quam, in
        dictum sem bibendum at. Suspendisse eget mi libero. Sed iaculis, ipsum
        in facilisis convallis, ipsum sapien sodales ante, sit amet feugiat elit
        nibh sit amet mauris. Donec sollicitudin dolor ut facilisis feugiat.
      </motion.div>
      <motion.div
        className="details__container"
        style={{ opacity: opacityMap, transition: transition, scale:scaleMap }}
      >
        <a href={gMapUrl} target="blank" className="details__gmap">
          Visit Map &rarr;
        </a>
        <div ref={mapContainer} className="details__map"></div>
      </motion.div>
    </motion.div>
  );
}

export default Details;
