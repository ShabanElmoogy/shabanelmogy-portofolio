import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import http from '@/api/httpClient';

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      await http.post('/v1/newsletter/subscribe', { email });
      setStatus('success');
      setMessage('Thanks for subscribing! You will receive our latest updates.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: { xs: 1.5, md: 2 }, 
        bgcolor: 'primary.main', 
        color: 'primary.contrastText',
        borderRadius: 4,
        textAlign: 'center',
        mt: 4,
        mb: 0
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 0.5 }}>
        Subscribe to our Newsletter
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
        Get the latest tutorials, articles, and insights delivered straight to your inbox.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto' }}>
        <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: 'transparent' },
              }
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="secondary"
            disabled={status === 'loading'}
            endIcon={<SendIcon />}
            sx={{ px: 3, py: { xs: 1, sm: 'auto' }, fontWeight: 'bold', minWidth: 120 }}
          >
            {status === 'loading' ? 'Sending...' : 'Subscribe'}
          </Button>
        </Box>
        
        {status === 'success' && (
          <Alert severity="success" sx={{ mt: 2, textAlign: 'left' }}>
            {message}
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error" sx={{ mt: 2, textAlign: 'left' }}>
            {message}
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default NewsletterSubscribe;
