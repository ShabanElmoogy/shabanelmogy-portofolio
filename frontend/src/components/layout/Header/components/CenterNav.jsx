/* eslint-disable react/prop-types */
import { Paper, Stack, Button } from "@mui/material";

const CenterNav = ({ navigationItems, onNavigate }) => (
  <Paper elevation={1} sx={{ borderRadius: 6, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
    <Stack direction="row" spacing={0} sx={{ px: 1, py: 0.5 }}>
      {navigationItems.map((item) => (
        <Button key={item.label} onClick={() => onNavigate(item)} sx={{ color: 'text.primary', fontSize: '0.9rem', fontWeight: 500, textTransform: 'none', px: 2.5, py: 1, borderRadius: 2, transition: 'all 0.2s ease', '&:hover': { color: 'primary.main', backgroundColor: 'action.hover', transform: 'translateY(-1px)' } }}>
          {item.label}
        </Button>
      ))}
    </Stack>
  </Paper>
);

export default CenterNav;
