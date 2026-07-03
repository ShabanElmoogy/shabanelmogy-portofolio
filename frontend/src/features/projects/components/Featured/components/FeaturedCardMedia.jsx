/* eslint-disable react/prop-types */
import { Box, CardMedia, Chip, IconButton, Tooltip } from "@mui/material";
import { Launch as LaunchIcon, GitHub as GitHubIcon, Star as StarIcon } from "@mui/icons-material";
import { trackEvent } from "@/lib/analytics";

const FeaturedCardMedia = ({ project }) => (
  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
    <CardMedia
      component="img"
      height="300"
      image={project.imgPath}
      alt={project.title}
      sx={{
        objectFit: 'contain',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}
    />
    <Box
      className="card-overlay"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}
    >
      {project.previewUrl && (
        <Tooltip title="View Live Demo">
          <IconButton
            size="large"
            // Track Live Demo click on featured project card image overlay
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              trackEvent('live_demo_click', { destination_url: project.previewUrl });
              window.open(project.previewUrl, '_blank', 'noopener,noreferrer');
            }}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(33, 150, 243, 0.8)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 1)',
                transform: 'scale(1.1)'
              }
            }}
          >
            <LaunchIcon />
          </IconButton>
        </Tooltip>
      )}
      {project.githubUrl && (
        <Tooltip title="View Source Code">
          <IconButton
            size="large"
            // Track Source Code click on featured project card image overlay
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              trackEvent('source_code_click', { destination_url: project.githubUrl });
              window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
            }}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
                transform: 'scale(1.1)'
              }
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
    
    <Chip
      icon={<StarIcon />}
      label="Featured"
      size="small"
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        fontWeight: 'bold',
        backgroundColor: '#ffa000',
        color: 'white',
        '& .MuiChip-icon': {
          color: 'white'
        }
      }}
    />
  </Box>
);

export default FeaturedCardMedia;
