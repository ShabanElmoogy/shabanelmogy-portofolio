import { Box, Typography, Paper, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const ServiceCard = ({ title, description, icon: Icon, index }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ height: "100%" }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 4,
          bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(33,150,243,0.03)",
          border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(33,150,243,0.1)"}`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: theme.palette.mode === "dark" 
              ? "0 10px 30px rgba(0,0,0,0.5)" 
              : "0 10px 30px rgba(33,150,243,0.15)",
          }
        }}
      >
        <Box 
          sx={{ 
            width: 70, 
            height: 70, 
            borderRadius: "50%", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            mb: 3,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            boxShadow: "0 8px 16px rgba(33, 150, 243, 0.3)"
          }}
        >
          <Icon sx={{ fontSize: 36 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default ServiceCard;
