/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  IconButton,
  CardMedia,
  Chip,
  MobileStepper,
  Grid,
  Card
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  PlayArrow as PlayArrowIcon
} from "@mui/icons-material";

const MediaGallery = ({ mediaItems = [], isDark = false, onBack }) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = mediaItems.length;

  const handleNext = () => setActiveStep((prev) => (prev + 1) % maxSteps);
  const handleBack = () => setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);

  if (!mediaItems || mediaItems.length === 0) return null;

  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: 4, overflow: "hidden", mt: 1, position: "relative" }}
    >
      <Box sx={{ p: 3, backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "background.paper", borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" spacing={1}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5, background: "linear-gradient(45deg, #2196F3, #21CBF3)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Project Gallery
            </Typography>
          </Box>
          <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mt: { xs: 1, md: 0 } }}>
            Back to Projects
          </Button>
        </Stack>
      </Box>

      <Box sx={{ position: "relative", height: 450 }}>
        {mediaItems[activeStep]?.type === 'video' ? (
          <Box sx={{ width: "100%", height: "100%", position: "relative", backgroundColor: "#000" }}>
            <iframe
              src={mediaItems[activeStep].embedUrl}
              title={mediaItems[activeStep].title}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: "none", borderRadius: "inherit" }}
            />
            <Chip icon={<PlayArrowIcon />} label="Video Content" size="medium" sx={{ position: "absolute", top: 20, left: 20, backgroundColor: "rgba(0,0,0,0.8)", color: "white", fontWeight: "bold", "& .MuiChip-icon": { color: "white" } }} />
          </Box>
        ) : (
          <CardMedia component="img" height="100%" width="100%" image={mediaItems[activeStep]?.url} alt={mediaItems[activeStep]?.alt} sx={{ objectFit: "contain" }} />
        )}

        {maxSteps > 1 && (
          <>
            <IconButton onClick={handleBack} sx={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", backgroundColor: "rgba(0,0,0,0.6)", color: "white", width: 56, height: 56, "&:hover": { backgroundColor: "rgba(0,0,0,0.8)", transform: "translateY(-50%) scale(1.1)" } }}>
              <KeyboardArrowLeft sx={{ fontSize: 32 }} />
            </IconButton>
            <IconButton onClick={handleNext} sx={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", backgroundColor: "rgba(0,0,0,0.6)", color: "white", width: 56, height: 56, "&:hover": { backgroundColor: "rgba(0,0,0,0.8)", transform: "translateY(-50%) scale(1.1)" } }}>
              <KeyboardArrowRight sx={{ fontSize: 32 }} />
            </IconButton>
          </>
        )}
      </Box>

      {maxSteps > 1 && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{ backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "background.paper", py: 2, "& .MuiMobileStepper-dot": { backgroundColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", width: 12, height: 12, margin: "0 4px" }, "& .MuiMobileStepper-dotActive": { backgroundColor: "primary.main" } }}
          nextButton={<Button size="medium" onClick={handleNext} disabled={activeStep === maxSteps - 1} sx={{ fontWeight: 600 }}>Next<KeyboardArrowRight /></Button>}
          backButton={<Button size="medium" onClick={handleBack} disabled={activeStep === 0} sx={{ fontWeight: 600 }}><KeyboardArrowLeft />Previous</Button>}
        />
      )}

      {maxSteps > 1 && (
        <Box sx={{ p: 3, backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "text.primary", mb: 2 }}>
            Quick Navigation
          </Typography>
          <Grid container spacing={2}>
            {mediaItems.map((item, index) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={index}>
                <Card sx={{ borderRadius: 2, cursor: 'pointer', border: activeStep === index ? '3px solid' : '3px solid transparent', borderColor: activeStep === index ? 'primary.main' : 'transparent', transition: 'all 0.3s ease', '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }} onClick={() => setActiveStep(index)}>
                  <Box sx={{ position: 'relative' }}>
                    {item.type === 'video' ? (
                      <Box sx={{ height: 100, backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <PlayArrowIcon sx={{ color: 'white', fontSize: 40 }} />
                        <Typography variant="caption" sx={{ position: 'absolute', bottom: 6, left: 6, color: 'white', backgroundColor: 'rgba(0,0,0,0.8)', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontWeight: 600 }}>
                          VIDEO
                        </Typography>
                      </Box>
                    ) : (
                      <CardMedia component="img" height="100" image={item.url} alt={item.alt} sx={{ objectFit: "cover" }} />
                    )}
                    {activeStep === index && (
                      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(33, 150, 243, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Chip label="Current" size="small" color="primary" sx={{ fontWeight: 'bold' }} />
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', textAlign: 'center', color: activeStep === index ? 'primary.main' : 'text.secondary' }}>
                      {index + 1}. {item.title}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default MediaGallery;
