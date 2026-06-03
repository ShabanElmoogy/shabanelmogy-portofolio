/* eslint-disable react/prop-types */
import { Stack, Typography, Button } from "@mui/material";
import DetailCard from "@/features/projects/components/ProjectDetails/components/cards/DetailCard";
import { Launch as LaunchIcon, GitHub as GitHubIcon } from "@mui/icons-material";

const openInNewTab = (url) => {
  console.log('Opening URL:', url);
  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    console.error('URL is empty or undefined');
  }
};

// Reusable action buttons that can be used by other components
export const ActionButtons = ({ previewUrl, githubUrl }) => {
  console.log('ActionButtons received:', { previewUrl, githubUrl });
  return (
  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
    {previewUrl && (
      <Button
        variant="contained"
        size="medium"
        startIcon={<LaunchIcon />}
        onClick={() => openInNewTab(previewUrl)}
        sx={{
          borderRadius: 3,
          px: 2,
          py: 1,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          "&:hover": {
            background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(33, 150, 243, 0.3)",
          },
        }}
      >
        Live Demo
      </Button>
    )}
    {githubUrl && (
      <Button
        variant="outlined"
        size="medium"
        startIcon={<GitHubIcon />}
        onClick={() => openInNewTab(githubUrl)}
        sx={{
          borderRadius: 3,
          px: 2,
          py: 1,
          borderWidth: 2,
          "&:hover": { borderWidth: 2, transform: "translateY(-2px)" },
        }}
      >
        Source Code
      </Button>
    )}
  </Stack>
  );
};

const ProjectActionsCard = ({ project, isDark }) => {
  return (
    <DetailCard isDark={isDark}>
      <Typography
        variant="overline"
        sx={{ fontWeight: 700, letterSpacing: 1, color: "text.secondary" }}
      >
        Actions
      </Typography>

      <ActionButtons
        previewUrl={project?.previewUrl}
        githubUrl={project?.githubUrl}
      />
    </DetailCard>
  );
};

export default ProjectActionsCard;
