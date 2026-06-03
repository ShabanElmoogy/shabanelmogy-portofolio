/* eslint-disable react/prop-types */
import Carousel from "react-material-ui-carousel";
import { Box, Container, useTheme, Grid } from "@mui/material";
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from "@mui/icons-material";
import FeaturedHeader from "@/features/projects/components/Featured/components/FeaturedHeader";
import FeaturedProjectCard from "@/features/projects/components/Featured/components/FeaturedProjectCard";

const FeaturedProjectsCarouselView = ({ projectGroups = [], isMobile = false }) => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <FeaturedHeader />

      <Box sx={{ px: { xs: 0, md: 6 } }}>
        <Carousel
          animation="slide"
          duration={500}
          indicators={true}
          navButtonsAlwaysVisible={!isMobile}
          navButtonsProps={{
            style: {
              backgroundColor: theme.palette.primary.main,
              color: "white",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              margin: "0",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              zIndex: 10,
            },
          }}
          NextIcon={<NavigateNextIcon />}
          PrevIcon={<NavigateBeforeIcon />}
          indicatorIconButtonProps={{
            style: {
              color: theme.palette.grey[400],
              margin: "0 5px",
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: theme.palette.primary.main,
            },
          }}
          sx={{
            "& .CarouselItem": {
              padding: "0 10px",
            },
            mx: { xs: 0, md: 4 },
          }}
        >
          {projectGroups.map((group, index) => (
            <Box key={index} sx={{ px: 2 }}>
              <Grid container spacing={4} alignItems="stretch">
                {group.map((project, idx) => (
                  <Grid key={project.id} size={{ xs: 12}}>
                    <FeaturedProjectCard project={project} index={idx} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default FeaturedProjectsCarouselView;