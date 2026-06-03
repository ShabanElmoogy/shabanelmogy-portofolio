/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";

const FeaturedCardTitle = ({ title }) => (
  <Typography
    variant="h5"
    component="h2"
    gutterBottom
    sx={{
      fontWeight: 600,
      mb: 2,
      lineHeight: 1.3
    }}
  >
    {title}
  </Typography>
);

export default FeaturedCardTitle;
