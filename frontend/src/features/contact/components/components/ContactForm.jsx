import Lottie from "lottie-react";
import doneAnimation from "../../../../../public/animations/done.json";
import { Box, Paper, Stack, TextField, Button, Alert, useTheme } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { ValidationError } from "@formspree/react";
import { useContactForm } from "@/features/contact/hooks/useContactForm";
import { trackEvent } from "@/lib/analytics";

const ContactForm = () => {
  const theme = useTheme();
  const { email, setEmail, message, setMessage, state, handleSubmit } = useContactForm();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background: theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(33,150,243,0.05)',
        border: theme.palette.mode === 'dark'
          ? '1px solid rgba(255,255,255,0.1)'
          : '1px solid rgba(33,150,243,0.1)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        flex: 1,
        width: '100%'
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            size="small"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <TextField
            fullWidth
            size="small"
            label="Message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            multiline
            rows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />

          <Button
            type="submit"
            variant="contained"
            disabled={state.submitting}
            // Track contact form submit button click
            onClick={() => trackEvent('contact_click', { button_text: 'Send' })}
            endIcon={<SendIcon />}
            sx={{
              borderRadius: 2,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              alignSelf: 'flex-start',
              minWidth: 140
            }}
          >
            {state.submitting ? "Sending..." : "Send"}
          </Button>

          {state.succeeded && (
            <Alert
              severity="success"
              sx={{
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Lottie
                loop={false}
                style={{ height: 20, width: 20 }}
                animationData={doneAnimation}
              />
              Message sent successfully!
            </Alert>
          )}
        </Stack>
      </Box>
    </Paper>
  );
};

export default ContactForm;
