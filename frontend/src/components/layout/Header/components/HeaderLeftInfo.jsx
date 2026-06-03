/* eslint-disable react/prop-types */
import { Box, Paper, Typography } from "@mui/material";
import { AccessTime as TimeIcon, LocationOn as LocationIcon, Code as CodeIcon } from "@mui/icons-material";

const HeaderLeftInfo = ({ currentTime, formatTime, techStack, currentTechIndex }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
    <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, borderRadius: 3, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s ease', '&:hover': { borderColor: 'primary.main', transform: 'translateY(-1px)', boxShadow: 2 } }}>
      <TimeIcon sx={{ fontSize: 18, color: 'primary.main' }} />
      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.primary', minWidth: 45 }}>
        {formatTime(currentTime)}
      </Typography>
    </Paper>

    <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, borderRadius: 3, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s ease', '&:hover': { borderColor: 'secondary.main', transform: 'translateY(-1px)', boxShadow: 2 } }}>
      <LocationIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
        Remote
      </Typography>
    </Paper>

    <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, borderRadius: 3, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider', width: 140, transition: 'all 0.3s ease', '&:hover': { borderColor: 'success.main', transform: 'translateY(-1px)', boxShadow: 2 } }}>
      <CodeIcon sx={{ fontSize: 18, color: 'success.main', flexShrink: 0 }} />
      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', transition: 'opacity 0.3s ease', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }} key={currentTechIndex}>
        {techStack[currentTechIndex]}
      </Typography>
    </Paper>
  </Box>
);

export default HeaderLeftInfo;
