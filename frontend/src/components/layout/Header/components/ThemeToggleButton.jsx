/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from "@mui/icons-material";

const ThemeToggleButton = ({ theme, toggleTheme }) => (
  <IconButton
    onClick={toggleTheme}
    sx={{
      backgroundColor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      boxShadow: 1,
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: theme === 'dark' ? 'orange' : 'primary.main',
        transform: 'scale(1.05) rotate(180deg)',
        boxShadow: 2
      }
    }}
    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
  >
    {theme === 'dark' ? (
      <LightModeIcon sx={{ color: 'orange' }} />
    ) : (
      <DarkModeIcon sx={{ color: 'primary.main' }} />
    )}
  </IconButton>
);

export default ThemeToggleButton;
