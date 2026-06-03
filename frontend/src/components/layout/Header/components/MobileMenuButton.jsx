/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const MobileMenuButton = ({ onOpen }) => (
  <IconButton
    edge="start"
    onClick={onOpen}
    sx={{
      backgroundColor: 'background.paper',
      boxShadow: 1,
      '&:hover': { transform: 'scale(1.05)' }
    }}
  >
    <MenuIcon />
  </IconButton>
);

export default MobileMenuButton;
