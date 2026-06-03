import { Box, Container, Divider, Fab, Zoom, useScrollTrigger } from "@mui/material";
import Header from "@/components/layout/Header/Header";
import Hero from "@/components/layout/Hero/Hero";
import Main from "@/features/projects/components/Main/Main";
import Contact from "@/features/contact/components/Contact";
import Footer from "@/components/layout/Footer/Footer";
import FeaturedProjectsCarousel from "@/features/projects/components/Featured/FeaturedProjectsCarousel";
import AdminLoginButton from "@/features/admin/components/AdminLoginButton";

// Smooth scroll-to-top using MUI utilities
function ScrollTop({ children }) {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 200 });

  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: (theme) => theme.zIndex.tooltip,
        }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio | Shaban Elmogy</title>
        <meta name="description" content="Welcome to my portfolio! Explore my projects, skills, and experience as a software developer." />
      </Helmet>
      {/* Anchor for scroll-to-top */}
      <Box id="back-to-top-anchor" />

      <Container
        maxWidth={false}
        sx={{
          py: 2,
          mt: "10px", // بدل my، استخدم mt و mb منفصلين
          mb: "10px",
          border: "2px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(63, 63, 70, 0.4)"
              : "rgba(202, 202, 202, 0.518)",
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgb(24, 24, 27)"
              : "#ffffff",
          width: { xs: "100%", sm: "90%", md: "85%" },
          minHeight: "calc(100vh - 10px)", // اطرح الـ margins (5px + 5px)
          mx: "auto",
          px: { xs: 3, md: 6, lg: 10 },
          overflowX: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Header />

        <Box component="section" id="hero" sx={{ mt: 4 }}>
          <Hero />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box component="section" id="featured-projects">
          <FeaturedProjectsCarousel />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box component="section" id="projects">
          <Main />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box component="section" id="contact">
          <Contact />
        </Box>

        <Footer />

        <AdminLoginButton />
      </Container>

      <ScrollTop>
        <Fab
          color="primary"
          size="medium"
          aria-label="scroll back to top"
        >
          ↑
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Home;
