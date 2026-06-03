/* eslint-disable react/prop-types */
import { Paper, useTheme } from "@mui/material";

const GlassPaper = ({ children, elevation = 0, fullHeight = true, sx = {}, ...props }) => {
  const theme = useTheme();

  const baseStyles = {
    p: 2.5,
    borderRadius: 3,
    background:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.05)"
        : "rgba(33,150,243,0.05)",
    border:
      theme.palette.mode === "dark"
        ? "1px solid rgba(255,255,255,0.1)"
        : "1px solid rgba(33,150,243,0.1)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 4px 20px rgba(0,0,0,0.1)"
        : "0 4px 20px rgba(33,150,243,0.05)",
    ...(fullHeight ? { height: "100%" } : {}),
  };

  return (
    <Paper elevation={elevation} sx={{ ...baseStyles, ...sx }} {...props}>
      {children}
    </Paper>
  );
};

export default GlassPaper;
