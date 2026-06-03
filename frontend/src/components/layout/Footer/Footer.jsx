import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

import FooterBrandCard from "@/components/layout/Footer/components/FooterBrandCard";
import FooterQuickLinks from "@/components/layout/Footer/components/FooterQuickLinks";
import FooterContactCard from "@/components/layout/Footer/components/FooterContactCard";
import FooterSocialCard from "@/components/layout/Footer/components/FooterSocialCard";
import { contactInfo, quickLinks, socialLinks } from "@/components/layout/Footer/components/footerData";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backdropFilter: "blur(10px)",
        borderTop:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(33,150,243,0.1)",
        py: 3,
        mt: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <FooterBrandCard />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
            <FooterQuickLinks links={quickLinks} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FooterContactCard contactInfo={contactInfo} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <FooterSocialCard socialLinks={socialLinks} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            px: 1,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            © 2024 Portfolio. All rights reserved.
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            Made with ❤️ using React & Material-UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
