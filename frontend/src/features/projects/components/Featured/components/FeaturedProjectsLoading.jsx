import { Container, Typography, Grid, Card, CardContent, CardActions, Skeleton } from "@mui/material";

const FeaturedProjectsLoading = () => (
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
      Showcasing our most important and innovative work
    </Typography>
    <Grid container spacing={4}>
      {[...Array(3)].map((_, index) => (
        <Grid size={{ xs: 12, md: 4 }} key={index}>
          <Card sx={{ borderRadius: 3 }}>
            <Skeleton variant="rectangular" height={300} />
            <CardContent>
              <Skeleton variant="text" height={32} />
              <Skeleton variant="text" height={20} width="60%" />
              <Skeleton variant="text" height={16} width="80%" />
            </CardContent>
            <CardActions>
              <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 2 }} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default FeaturedProjectsLoading;
