import { Grid, Paper, Box } from "@mui/material";
import { useTheme } from "@/providers/ThemeContext";
import { lazy, Suspense } from "react";
import HeroProfile from "@/components/layout/Hero/components/HeroProfile";
const LazyHeroAnimation = lazy(() => import("./components/HeroAnimation"));
import TechStackSection from "@/components/layout/Hero/components/TechStackSection";
import { techStacks } from "@/components/layout/Hero/components/techStacks";

const Hero = () => {
  const { isDark } = useTheme();

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          mt: 5,
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: isDark
            ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)"
            : "linear-gradient(135deg, rgba(33,150,243,0.08) 0%, rgba(33,150,243,0.02) 100%)",
          backdropFilter: "blur(20px)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(33,150,243,0.12)"
        }}
      >
        <Grid container spacing={3} alignItems="center">
          {/* Profile Section */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, sm: 8 }}>
                <HeroProfile />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Suspense fallback={null}>
                  <LazyHeroAnimation />
                </Suspense>
              </Grid>
            </Grid>
          </Grid>

          {/* Tech Stack - Compact */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <TechStackSection techStacks={techStacks} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Hero;
