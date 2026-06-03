/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Chip,
  Fade,
  Collapse,
  Avatar
} from "@mui/material";
import {
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Lightbulb as LightbulbIcon,
  Build as BuildIcon,
  Timeline as TimelineIcon,
  Code as CodeIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  PhoneAndroid as MobileIcon,
  Language as WebIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from "@mui/icons-material";

const EnhancedDescriptionSection = ({ description, index, isDark }) => {
  const [expanded, setExpanded] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  const getSectionIcon = (title) => {
    const titleLower = (title || '').toLowerCase();
    if (titleLower.includes('feature') || titleLower.includes('key')) return <CheckCircleIcon />;
    if (titleLower.includes('technical') || titleLower.includes('tech')) return <CodeIcon />;
    if (titleLower.includes('design') || titleLower.includes('ui')) return <PaletteIcon />;
    if (titleLower.includes('security')) return <SecurityIcon />;
    if (titleLower.includes('performance') || titleLower.includes('speed')) return <SpeedIcon />;
    if (titleLower.includes('mobile')) return <MobileIcon />;
    if (titleLower.includes('web')) return <WebIcon />;
    if (titleLower.includes('overview') || titleLower.includes('about')) return <DescriptionIcon />;
    if (titleLower.includes('highlight')) return <LightbulbIcon />;
    if (titleLower.includes('implementation') || titleLower.includes('build')) return <BuildIcon />;
    if (titleLower.includes('timeline') || titleLower.includes('process')) return <TimelineIcon />;
    return <DescriptionIcon />;
  };

  const getGradientColors = (idx) => {
    const gradients = [
      ['#667eea', '#764ba2'],
      ['#f093fb', '#f5576c'],
      ['#4facfe', '#00f2fe'],
      ['#43e97b', '#38f9d7'],
      ['#fa709a', '#fee140'],
      ['#a8edea', '#fed6e3'],
      ['#ff9a9e', '#fecfef'],
      ['#a18cd1', '#fbc2eb'],
    ];
    return gradients[idx % gradients.length];
  };

  const [color1, color2] = getGradientColors(index);

  return (
    <Fade in={animate} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
      <Paper
        elevation={expanded ? 6 : 3}
        sx={{
          mb: 3,
          borderRadius: 3,
          overflow: 'hidden',
          background: isDark 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
            : 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: expanded ? 'translateY(-2px)' : 'translateY(0)',
          '&:hover': {
            transform: expanded ? 'translateY(-4px)' : 'translateY(-2px)',
            boxShadow: expanded ? 8 : 6
          }
        }}
      >
        <Box
          onClick={() => setExpanded(!expanded)}
          sx={{
            p: 3,
            background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
            color: 'white',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
              transform: expanded ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.6s ease'
            }
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                width: 48,
                height: 48
              }}
            >
              {getSectionIcon(description.title)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 0.5,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                {description.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.9,
                  fontWeight: 500
                }}
              >
                {description.points.length} key point{description.points.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Stack>
        </Box>

        <Collapse in={expanded} timeout={400}>
          <Box sx={{ p: 3, pt: 2 }}>
            <Stack spacing={2}>
              {description.points.map((point, pointIndex) => (
                <Fade
                  key={pointIndex}
                  in={expanded}
                  timeout={600}
                  style={{ transitionDelay: `${pointIndex * 100}ms` }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
                        : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)',
                      border: isDark
                        ? '1px solid rgba(255,255,255,0.05)'
                        : '1px solid rgba(0,0,0,0.03)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        background: isDark
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                          : 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)',
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        background: `linear-gradient(135deg, ${color1}40 0%, ${color2}40 100%)`,
                        color: color1,
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        border: `2px solid ${color1}20`
                      }}
                    >
                      {pointIndex + 1}
                    </Avatar>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.7,
                        color: 'text.primary',
                        fontWeight: 400,
                        flex: 1,
                        whiteSpace: 'pre-line',
                        '& strong': {
                          color: 'primary.main',
                          fontWeight: 600
                        }
                      }}
                    >
                      {point}
                    </Typography>
                  </Box>
                </Fade>
              ))}
            </Stack>

            <Box
              sx={{
                mt: 3,
                pt: 2,
                borderTop: isDark
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Chip
                label={`Section ${index + 1}`}
                size="small"
                sx={{
                  background: `linear-gradient(135deg, ${color1}20 0%, ${color2}20 100%)`,
                  color: color1,
                  fontWeight: 600,
                  border: `1px solid ${color1}30`
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontStyle: 'italic'
                }}
              >
                Click header to {expanded ? 'collapse' : 'expand'}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </Fade>
  );
};

export default EnhancedDescriptionSection;
