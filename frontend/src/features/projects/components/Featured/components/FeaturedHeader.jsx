import { Typography, Box } from "@mui/material";

const FeaturedHeader = () => (
  <Box sx={{ textAlign: 'center', mb: 6 }}>
    <Typography
      variant="h3"
      sx={{
        fontWeight: 700,
        mb: 2,
        background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
      Featured Projects
    </Typography>
    <Typography
      variant="h6"
      color="text.secondary"
      sx={{ maxWidth: 600, mx: 'auto' }}
    >
      Showcasing our most important and innovative work
    </Typography>
  </Box>
);

export default FeaturedHeader;
