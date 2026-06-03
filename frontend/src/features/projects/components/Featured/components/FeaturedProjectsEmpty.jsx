import { Container, Typography } from "@mui/material";

const FeaturedProjectsEmpty = () => (
  <Container maxWidth="xl" sx={{ py: 6 }}>
    <Typography
      variant="h3"
      sx={{
        fontWeight: 700,
        mb: 2,
        textAlign: 'center',
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
      sx={{ textAlign: 'center', mb: 4 }}
    >
      No featured projects available at the moment
    </Typography>
  </Container>
);

export default FeaturedProjectsEmpty;
