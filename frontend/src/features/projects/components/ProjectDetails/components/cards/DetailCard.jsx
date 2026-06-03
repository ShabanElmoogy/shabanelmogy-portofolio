/* eslint-disable react/prop-types */
import { Paper } from "@mui/material";

const DetailCard = ({ isDark, height = 180, elevation = 2, sx = {}, children, ...paperProps }) => {
  const baseSx = {
    p: 3,
    height,
    borderRadius: 3,
    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "background.paper",
    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.06)",
  };

  return (
    <Paper elevation={elevation} sx={[baseSx, sx]} {...paperProps}>
      {children}
    </Paper>
  );
};

export default DetailCard;
