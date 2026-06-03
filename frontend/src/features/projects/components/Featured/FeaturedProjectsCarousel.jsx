/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, useTheme, useMediaQuery } from "@mui/material";
import useFeaturedProjects from "@/features/projects/components/Featured/hooks/useFeaturedProjects";
import FeaturedProjectsEmpty from "@/features/projects/components/Featured/components/FeaturedProjectsEmpty";
import FeaturedProjectsLoading from "@/features/projects/components/Featured/components/FeaturedProjectsLoading";
import FeaturedProjectsCarouselView from "@/features/projects/components/Featured/components/FeaturedProjectsCarouselView";

const FEATURED_PROJECTS_URL = undefined;

// Extract concise description from Overview points; fallback to project.description or default text
const FeaturedProjectsCarousel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { featuredProjects, loading, projectGroups } = useFeaturedProjects({ isMobile });

  if (loading) return <FeaturedProjectsLoading />;
  if (featuredProjects.length === 0) return <FeaturedProjectsEmpty />;

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <FeaturedProjectsCarouselView projectGroups={projectGroups} isMobile={isMobile} />
    </Container>
  );
};

export default FeaturedProjectsCarousel;
