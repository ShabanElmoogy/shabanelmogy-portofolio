/* eslint-disable react/prop-types */
import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";

const LoadingSkeletonGrid = ({ count = 6 }) => (
  <Grid container spacing={3}>
    {[...Array(count)].map((_, index) => (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
        <Card sx={{ borderRadius: 3 }}>
          <Skeleton variant="rectangular" height={240} />
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
);

export default LoadingSkeletonGrid;
