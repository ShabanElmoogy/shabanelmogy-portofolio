import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import ContactHeader from "@/features/contact/components/components/ContactHeader";
import ContactForm from "@/features/contact/components/components/ContactForm";
import ContactAnimation from "@/features/contact/components/components/ContactAnimation";

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <ContactHeader />

      <Box sx={{
        display: 'flex',
        gap: 4,
        alignItems: 'flex-start',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        <ContactForm />

        {!isMobile && <ContactAnimation />}
      </Box>
    </Container>
  );
};

export default Contact;