import { Box, CardMedia, IconButton, Tooltip, Chip } from "@mui/material";
import {
  Launch as LaunchIcon,
  GitHub as GitHubIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

/* eslint-disable react/prop-types */
const ProjectCardMedia = ({ item, adminMode, onOpenUrl, onEdit, onDelete }) => {
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <CardMedia
        component="img"
        height="240"
        image={item.imgPath}
        alt={item.title}
        sx={{
          objectFit: "contain",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.05)" },
        }}
      />

      {/* Regular Overlay (Preview/GitHub) */}
      <Box
        className="card-overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          zIndex: adminMode ? 1 : 2,
        }}
      >
        {item.previewUrl && (
          <Tooltip title="View Live Demo">
            <IconButton
              size="large"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenUrl?.(item.previewUrl);
              }}
              sx={{
                color: "white",
                backgroundColor: "rgba(33, 150, 243, 0.8)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 1)",
                  transform: "scale(1.1)",
                },
              }}
            >
              <LaunchIcon />
            </IconButton>
          </Tooltip>
        )}
        {item.githubUrl && (
          <Tooltip title="View Source Code">
            <IconButton
              size="large"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenUrl?.(item.githubUrl);
              }}
              sx={{
                color: "white",
                backgroundColor: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                  transform: "scale(1.1)",
                },
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Admin Overlay (Edit/Delete) */}
      {adminMode && (
        <Box
          className="admin-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(45deg, rgba(156, 39, 176, 0.8) 0%, rgba(123, 31, 162, 0.6) 100%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            zIndex: 2,
          }}
        >
          <Tooltip title="Edit Project">
            <IconButton
              size="large"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit?.(item, e);
              }}
              sx={{
                color: "white",
                backgroundColor: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                  transform: "scale(1.1)",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Project">
            <IconButton
              size="large"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete?.(item, e);
              }}
              sx={{
                color: "white",
                backgroundColor: "rgba(244, 67, 54, 0.8)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  backgroundColor: "rgba(244, 67, 54, 1)",
                  transform: "scale(1.1)",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {item.featured && (
        <Chip
          label="Featured"
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            fontWeight: "bold",
            backgroundColor: "#ffa000",
            color: "white",
            zIndex: 3,
          }}
        />
      )}
    </Box>
  );
};

export default ProjectCardMedia;
