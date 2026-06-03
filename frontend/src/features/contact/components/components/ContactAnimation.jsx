import { Box } from "@mui/material";
import Lottie from "lottie-react";
import emailAnimation from "../../../../../public/animations/email.json";

const ContactAnimation = () => {
  return (
    <Box sx={{ flexShrink: 0, alignSelf: 'center' }}>
      <Lottie
        style={{ height: 200, width: 200 }}
        animationData={emailAnimation}
      />
    </Box>
  );
};

export default ContactAnimation;
