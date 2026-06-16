/* eslint-disable react/prop-types */
import { Box, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Chip, Stack, Paper, Divider } from "@mui/material";
import { Close as CloseIcon, AccessTime as TimeIcon, Code as CodeIcon } from "@mui/icons-material";

const HeaderMobileDrawer = ({ open, onClose, currentTime, formatTime, techStack, currentTechIndex, navigationItems, onNavigate }) => (
  <Drawer
    anchor="left"
    open={open}
    onClose={onClose}
    PaperProps={{ sx: { width: '75%', maxWidth: 300, backgroundColor: 'background.paper', backdropFilter: 'blur(10px)' } }}
    ModalProps={{ BackdropProps: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' } } }}
  >
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Navigation</Typography>
        <IconButton onClick={onClose} sx={{ transition: 'all 0.3s ease', '&:hover': { transform: 'rotate(180deg)', color: 'error.main' } }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <Paper elevation={0} sx={{ p: 2, backgroundColor: 'action.hover', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <TimeIcon sx={{ color: 'primary.main' }} />
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Current Time</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{formatTime(currentTime)}</Typography>
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 2, backgroundColor: 'action.hover', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <CodeIcon sx={{ color: 'success.main' }} />
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Currently Working With</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{techStack[currentTechIndex]}</Typography>
          </Box>
        </Paper>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => onNavigate(item)} sx={{ borderRadius: 2, mb: 1, transition: 'all 0.3s ease', '&:hover': { backgroundColor: 'action.hover', transform: 'translateX(8px)' } }}>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '1rem', fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>Tech Stack</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {techStack.map((tech) => (
            <Chip key={tech} label={tech} size="small" variant="outlined" sx={{ fontSize: '0.75rem', transition: 'all 0.2s ease', '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText', transform: 'scale(1.05)' } }} />
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 3, p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
        <Stack direction="row" spacing={3} justifyContent="center">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', lineHeight: 1 }}>3+</Typography>
            <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.7 }}>Years</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', lineHeight: 1 }}>30+</Typography>
            <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.7 }}>Projects</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', lineHeight: 1 }}>100%</Typography>
            <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.7 }}>Success</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  </Drawer>
);

export default HeaderMobileDrawer;
