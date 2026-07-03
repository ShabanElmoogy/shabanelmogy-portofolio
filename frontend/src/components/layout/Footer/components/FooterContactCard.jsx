/* eslint-disable react/prop-types */
import { Box, Link, Stack, Typography } from "@mui/material";
import GlassPaper from "@/components/ui/GlassPaper";
import { trackEvent } from "@/lib/analytics";

const FooterContactCard = ({ contactInfo }) => {
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
          Get In Touch
        </Typography>
        <Stack spacing={1}>
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Link
                key={index}
                href={info.href}
                title={info.label}
                // Track contact link clicks (Email, Phone)
                onClick={() => {
                  let eventName = 'contact_click';
                  if (info.href?.startsWith('mailto:')) eventName = 'email_click';
                  if (info.href?.startsWith('tel:')) eventName = 'phone_click';
                  trackEvent(eventName, { destination_url: info.href, label: info.label });
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  width: '100%',
                  flexWrap: 'wrap',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'action.hover',
                    transform: 'translateX(4px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0
                  }}
                >
                  {info.imageSrc ? (
                    <Box component="img" src={info.imageSrc} alt={info.label} sx={{ width: 18, height: 18, borderRadius: '4px', display: 'block' }} />
                  ) : Icon ? (
                    <Icon fontSize="inherit" />
                  ) : null}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    lineHeight: 1.4,
                    flex: 1,
                    minWidth: 0,
                    overflowWrap: 'anywhere',
                    wordBreak: 'break-word',
                    whiteSpace: 'normal'
                  }}
                >
                  {info.label}
                </Typography>
              </Link>
            );
          })}
        </Stack>
      </GlassPaper>
  );
};

export default FooterContactCard;
