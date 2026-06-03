import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Tooltip,
} from "@mui/material";
import { Home, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminLoginTime");
    // Redirect to home
    navigate("/", { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      elevation={2}
    >
      <Toolbar>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>A</Avatar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>

        <Tooltip title="Go to Home Page">
          <Button
            color="inherit"
            startIcon={<Home />}
            onClick={handleHomeClick}
            sx={{
              mr: 1,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            Home
          </Button>
        </Tooltip>

        <Tooltip title="Logout">
          <Button
            color="inherit"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              mr: 1,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            Logout
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
