/* eslint-disable react/prop-types */
import { Stack, Typography, Chip } from "@mui/material";
import DetailCard from "@/features/projects/components/ProjectDetails/components/cards/DetailCard";

const ProjectDetailsCard = ({ project, isDark }) => {
  return (
    <DetailCard isDark={isDark}>
      <Typography
        variant="overline"
        sx={{ fontWeight: 700, letterSpacing: 1, color: "text.secondary" }}
      >
        Project Details
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          lineHeight: 1.2,
          mb: 1,
          background: "linear-gradient(45deg, #2196F3, #21CBF3)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {project?.title}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} alignItems="center" sx={{ mb: 1 }}>
        {project?.businessType && (
          <Chip
            label={project.businessType.name}
            variant="outlined"
            sx={{ borderColor: "info.main", color: "info.main", fontWeight: 600 }}
            size="small"
          />
        )}
        {project?.category && (
          <Chip
            label={project.category.name}
            variant="outlined"
            sx={{ borderColor: "primary.main", color: "primary.main", fontWeight: 600 }}
            size="small"
          />
        )}
        <Chip
          label={project?.featured ? "Featured" : "Regular"}
          size="small"
          color={project?.featured ? "warning" : "default"}
          variant="filled"
        />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="caption" color="text.secondary">
          Created {project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : "-"}
        </Typography>
        <Typography variant="caption" color="text.secondary">•</Typography>
        <Typography variant="caption" color="text.secondary">
          Updated {project?.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : "-"}
        </Typography>
      </Stack>
    </DetailCard>
  );
};

export default ProjectDetailsCard;
