/* eslint-disable react/prop-types */
import { Chip, Stack } from "@mui/material";

const FeaturedCardTechnologies = ({ project }) => (
  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
    {project.technologies && project.technologies.length > 0 ? (
      project.technologies.slice(0, 4).map((tech, techIndex) => (
        <Chip
          key={techIndex}
          label={tech.name || tech}
          size="small"
          variant="filled"
          sx={{
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
            fontSize: '0.75rem',
            '&:hover': {
              backgroundColor: 'secondary.dark'
            }
          }}
        />
      ))
    ) : null}
    {project.technologies && project.technologies.length > 4 && (
      <Chip
        label={`+${project.technologies.length - 4} more`}
        size="small"
        variant="outlined"
        color="secondary"
        sx={{ fontSize: '0.75rem' }}
      />
    )}
  </Stack>
);

export default FeaturedCardTechnologies;
