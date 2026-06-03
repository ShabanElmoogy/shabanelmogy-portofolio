/* eslint-disable react/prop-types */
import { Box, IconButton, Stack, Typography } from "@mui/material";
import GlassPaper from "@/components/ui/GlassPaper";

const FooterSocialCard = ({ socialLinks }) => {
  return (
      <GlassPaper elevation={0}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 1.5,
            color: 'text.primary',
            fontSize: '0.95rem'
          }}
        >
          Follow Me
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <IconButton
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  backgroundColor: social.color,
                  color: 'white',
                  width: 32,
                  height: 32,
                  boxShadow: `0 2px 8px ${social.color}30`,
                  '&:hover': {
                    backgroundColor: social.color,
                    transform: 'translateY(-2px) scale(1.05)',
                    boxShadow: `0 4px 12px ${social.color}40`
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {social.imageSrc ? (
                  <Box component="img" src={social.imageSrc} alt={social.label} sx={{ width: 18, height: 18, borderRadius: '4px', display: 'block' }} />
                ) : Icon ? (
                  <Icon fontSize="small" />
                ) : null}
              </IconButton>
            );
          })}
        </Stack>
        <Box sx={{ mt: 1.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: '0.75rem' }}
          >
            Connect with me on social platforms
          </Typography>
        </Box>
      </GlassPaper>
  );
};

export default FooterSocialCard;
