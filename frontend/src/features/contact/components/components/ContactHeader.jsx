/* eslint-disable react/no-unescaped-entities */
import { Box, Typography } from "@mui/material";

const ContactHeader = () => {
  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 1,
          background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '2rem', md: '2.5rem' }
        }}
      >
        Let's Connect
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 400, mx: 'auto' }}
      >
        Ready to bring your ideas to life? Let's chat!
      </Typography>
    </Box>
  );
};

export default ContactHeader;
