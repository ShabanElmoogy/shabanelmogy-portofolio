/* eslint-disable react/prop-types */
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { FormatQuote as FormatQuoteIcon } from "@mui/icons-material";

// Extract a concise description from the project's descriptions, preferring the 'Overview' category
const getProjectDescription = (project) => {
  const defaultText = (project && typeof project.description === 'string' && project.description.trim())
    ? project.description.trim()
    : "A featured project showcasing cutting-edge technologies and innovative solutions.";
  if (!project || !Array.isArray(project.descriptions) || project.descriptions.length === 0) return defaultText;
  const overviewDesc = project.descriptions.find(d => String(d.category || '').toLowerCase() === 'overview')
                    || project.descriptions[0];
  if (!overviewDesc || !Array.isArray(overviewDesc.points)) return defaultText;
  const firstPoint = overviewDesc.points.find(p => p && String(p).trim());
  if (!firstPoint) return defaultText;
  const cleaned = String(firstPoint).replace(/^[\s•\-\*\u2022\(\)0-9\.]+/, '').trim();
  return cleaned || defaultText;
};

const FeaturedCardOverview = ({ project }) => (
  <Box sx={(theme) => ({
    mb: 2,
    px: 1.5,
    py: 1,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    borderRadius: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
  })}>
    <Stack direction="row" spacing={1.25} alignItems="flex-start">
      <FormatQuoteIcon sx={{ fontSize: 18, color: 'text.secondary', mt: '2px' }} />
      <Tooltip title={getProjectDescription(project)} placement="top" arrow disableInteractive>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55, height: '3em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {getProjectDescription(project)}
        </Typography>
      </Tooltip>
    </Stack>
  </Box>
);

export default FeaturedCardOverview;
