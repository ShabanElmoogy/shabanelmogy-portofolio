/* eslint-disable react/prop-types */
import { Button, CardActions } from "@mui/material";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { trackEvent } from "@/lib/analytics";

const ProjectCardActions = ({ isDark, onNavigate, item }) => {
  return (
    <CardActions sx={{ px: 3, pt: 3, pb: 2 }}>
      <Button
        variant="contained"
        endIcon={<ArrowForwardIcon />}
        fullWidth
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Track when a user clicks the View Details button to open a project
          trackEvent('project_open', { project_name: item.title });
          onNavigate?.(item.id);
        }}
        sx={{
          borderRadius: 2,
          py: 1.5,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          background: isDark
            ? "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)"
            : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          "&:hover": {
            background: isDark
              ? "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)"
              : "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
            transform: "translateY(-2px)",
            boxShadow: isDark
              ? "0 8px 20px rgba(25, 118, 210, 0.4)"
              : "0 8px 20px rgba(33, 150, 243, 0.3)",
          },
        }}
      >
        View Details
      </Button>
    </CardActions>
  );
};

export default ProjectCardActions;
