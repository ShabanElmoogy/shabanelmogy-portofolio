/* eslint-disable react/prop-types */
import { Stack, Typography, Chip } from "@mui/material";
import DetailCard from "@/features/projects/components/ProjectDetails/components/cards/DetailCard";

const TechStackCard = ({ project, isDark }) => {
  return (
    <DetailCard isDark={isDark}>
      <Typography
        variant="overline"
        sx={{ fontWeight: 700, letterSpacing: 1, color: "text.secondary" }}
      >
        Tech Stack
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {project?.technologies && project.technologies.length > 0 ? (
          project.technologies.map((tech, index) => (
            <Chip
              key={index}
              label={tech.name || tech}
              variant="filled"
              sx={{
                backgroundColor: "secondary.main",
                color: "secondary.contrastText",
                fontWeight: 500,
                "&:hover": { backgroundColor: "secondary.dark" },
              }}
              size="small"
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No technologies specified
          </Typography>
        )}
      </Stack>
    </DetailCard>
  );
};

export default TechStackCard;
