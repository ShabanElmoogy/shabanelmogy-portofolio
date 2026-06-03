import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import VerifiedIcon from "@mui/icons-material/Verified";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import ExperienceBadge from "@/components/layout/Hero/components/ExperienceBadge";
import { useTheme } from "@/providers/ThemeContext";

const HeroProfile = () => {
  const { isDark } = useTheme();
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "center", sm: "flex-start" }} textAlign={{ xs: "center", sm: "left" }}>
      <Box sx={{ position: "relative" }}>
        <motion.div>
          <Avatar
            src="/mypic.png"
            alt="Profile"
            imgProps={{ loading: "eager", fetchpriority: "high", decoding: "async", width: 100, height: 100 }}
            sx={{
              width: { xs: 80, sm: 100 },
              height: { xs: 80, sm: 100 },
              border: 2,
              borderColor: "primary.main",
              boxShadow: isDark
                ? "0 0 0 3px rgba(33, 150, 243, 0.2), 0 8px 24px rgba(0, 0, 0, 0.3)"
                : "0 0 0 3px rgba(33, 150, 243, 0.1), 0 8px 24px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        </motion.div>
        <Box sx={{ position: "absolute", bottom: 4, right: 4, backgroundColor: "primary.main", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: 2 }}>
          <VerifiedIcon sx={{ color: "white", fontSize: 14 }} />
        </Box>
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, mb: 0.5, fontSize: "0.9rem" }}>
          👋 Hello, Im
        </Typography>

        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: "1.5rem", sm: "2rem", md: "2.20rem" }, lineHeight: 1.2, background: "linear-gradient(45deg, #2196F3, #21CBF3)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Shaban Elmogy
        </Typography>

        <Typography variant="h6" component="h2" sx={{ color: "primary.main", fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1.1rem" }, mb: 0.5 }}>
          Full-Stack Developer
        </Typography>

        <ExperienceBadge />

        
        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem", lineHeight: 1.5, display: { xs: "none", sm: "block" } }}>
          Passionate developer creating <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>robust, scalable applications</Box> with modern technologies.
        </Typography>

        <Stack direction="row" spacing={1.5} justifyContent={{ xs: "center", sm: "flex-start" }} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component="a"
            href="https://flowcv.com/resume/2car3hlgwtet"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<DownloadRounded />}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Download CV
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default HeroProfile;
