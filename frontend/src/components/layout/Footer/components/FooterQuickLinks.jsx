/* eslint-disable react/prop-types */
import { Typography, Stack, Link } from "@mui/material";
import GlassPaper from "@/components/ui/GlassPaper";

const FooterQuickLinks = ({ links }) => {
  return (
    <GlassPaper elevation={0}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          mb: 1.5,
          color: "text.primary",
          fontSize: "0.95rem",
        }}
      >
        Quick Links
      </Typography>
      <Stack spacing={1}>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              fontSize: "0.8rem",
              py: 0.5,
              px: 1,
              borderRadius: 1,
              "&:hover": {
                color: "primary.main",
                backgroundColor: "action.hover",
                transform: "translateX(4px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            {link.label}
          </Link>
        ))}
      </Stack>
    </GlassPaper>
  );
};

export default FooterQuickLinks;
