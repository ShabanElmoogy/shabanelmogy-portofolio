import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const ExperienceBadge = () => {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.5,
          borderRadius: 2,
          background: "linear-gradient(45deg, rgba(33, 150, 243, 0.1), rgba(33, 203, 243, 0.1))",
          border: "1px solid",
          borderColor: "primary.main",
          borderOpacity: 0.3,
          transition: "all 0.3s ease",
          cursor: "pointer",
          width: "fit-content",
          mb: 1,
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 4px 12px rgba(33, 150, 243, 0.2)",
            background: "linear-gradient(45deg, rgba(33, 150, 243, 0.15), rgba(33, 203, 243, 0.15))",
          },
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "success.main",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": { opacity: 1, transform: "scale(1)" },
              "50%": { opacity: 0.7, transform: "scale(1.2)" },
              "100%": { opacity: 1, transform: "scale(1)" },
            },
          }}
        />
        <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 600, fontSize: { xs: "0.75rem", sm: "0.85rem" }, fontFamily: "monospace" }}>
          2020 → now
        </Typography>
        <Box sx={{ px: 0.8, py: 0.2, borderRadius: 1, backgroundColor: "success.main", color: "white" }}>
          <Typography variant="caption" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" }, fontWeight: 600, lineHeight: 1 }}>
            3+ YRS
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ExperienceBadge;
