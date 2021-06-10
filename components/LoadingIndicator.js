import React from "react";
import styles from "../styles/LoadingIndicator.module.css";
import { motion } from "framer-motion";

const bounceVars = {
  visible: {
    rotate:[0, 0, 0, 0,0,0,0,0, 0, 0,0,0,0,0,0,0, 0, 90, 180, 270, 360  ],
    scale: [.8, 1, 1.2, 1, .6],
    x:[0, -40, -50, -60,-60,-60,-50,-40, 0, 40,50,60,60,60,50,40, 0, 0, 0, 0, 0  ],
    y:[0, -150, -160, -150, 0,-150,-160,-150, 0, -150,-160,-150,0,-150,-160,-150, 0, -140, -160, -140, 0  ],
    transition: { delay: 0 , repeat: Infinity, ease: "easeInOut" , duration:3.2},
  },
};

export default function LoadingIndicator(props) {
  return (
    <motion.div
      className={styles.loadingI}
      variants={bounceVars}
      animate="visible"
    >
      <img
        src="https://res.cloudinary.com/city-of-bounce/image/upload/v1558474701/LogoTeal.png"
        alt="loading..."
      />
    </motion.div>
  );
}
