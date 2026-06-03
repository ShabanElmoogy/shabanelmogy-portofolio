/* eslint-disable react/prop-types */
import { Chip, Stack } from "@mui/material";

const FeaturedCardMetaChips = ({ project }) => (
  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
    {project.businessType && (
      <Chip
        label={project.businessType.name}
        size="small"
        variant="outlined"
        sx={{
          borderColor: 'info.main',
          color: 'info.main',
          fontSize: '0.75rem'
        }}
      />
    )}
    {project.category && (
      <Chip
        label={project.category.name}
        size="small"
        variant="outlined"
        sx={{
          borderColor: 'primary.main',
          color: 'primary.main',
          fontSize: '0.75rem'
        }}
      />
    )}
  </Stack>
);

export default FeaturedCardMetaChips;
