import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
// @ts-ignore
import developerAnimation from "../../../../../public/animations/developer.json";
import { useRef } from "react";

const HeroAnimation = () => {
  const lottieRef = useRef();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ width: "100%", maxWidth: { xs: 150, sm: 180 }, filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.1))" }}>
          <Lottie
            animationData={developerAnimation}
            lottieRef={lottieRef}
            onLoadedImages={() => {
              // @ts-ignore
              lottieRef.current?.setSpeed(0.5);
            }}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default HeroAnimation;
