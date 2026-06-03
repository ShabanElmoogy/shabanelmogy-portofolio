import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import { Box, Container, Typography, Button, Skeleton, Stack, Breadcrumbs, Link } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Home as HomeIcon } from "@mui/icons-material";
import { useTheme } from "@/providers/ThemeContext";
import MediaGallery from "@/features/projects/components/ProjectDetails/MediaGallery";
import TabbedDescriptions from "@/features/projects/components/ProjectDetails/TabbedDescriptions";
import useProjectDetail from "@/features/projects/components/ProjectDetails/hooks/useProjectDetail";

const ProjectDetail = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const { project, loading, error, mediaItems, goBack, goHome, fetchProject } = useProjectDetail(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    return () => { if ("scrollRestoration" in history) history.scrollRestoration = "auto"; };
  }, []);

  useEffect(() => {
    if (!id) return;
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 3, mb: 4 }} />
        <Skeleton variant="text" height={60} width="70%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={30} width="50%" sx={{ mb: 3 }} />
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" color="error" gutterBottom>
          {error || "Project not found"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The project you are looking for does not exist or has been removed.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={goBack}>Go Back</Button>
          <Button variant="contained" startIcon={<HomeIcon />} onClick={goHome}>Go Home</Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: isDark ? "#0a0a0a" : "#fafafa" }}>
      <Helmet>
        <title>{project.title} | Shaban Elmogy</title>
        <meta name="description" content={`Check out my project: ${project.title}`} />
      </Helmet>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 1 }}>
          <Link component="button" variant="body2" onClick={goHome} sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "primary.main", "&:hover": { textDecoration: "underline" } }}>
            <HomeIcon sx={{ mr: 0.5, fontSize: 16 }} />
            Home
          </Link>
          <Typography variant="body2" color="text.primary">{project.title}</Typography>
        </Breadcrumbs>

        {mediaItems.length > 0 && (
          <MediaGallery mediaItems={mediaItems} isDark={isDark} onBack={goBack} />
        )}

        <Box sx={{ mt: 2 }}>
          <TabbedDescriptions descriptions={project.descriptions || []} isDark={isDark} project={project} />
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectDetail;
