/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Fade,
  Slide,
  LinearProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  Lock,
  Person,
  Security,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useAdminLogin } from '@/features/admin/hooks/useAdminLogin';

const AdminLoginDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const {
    credentials,
    showPassword,
    setShowPassword,
    error,
    loading,
    handleChange,
    handleSubmit,
    handleClose
  } = useAdminLogin(onClose);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="xs" 
      fullWidth
      TransitionComponent={Slide}
      // @ts-ignore
      TransitionProps={{ direction: "up" }}
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[16],
          overflow: 'hidden',
        }
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(8px)',
          backgroundColor: alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.7 : 0.3),
        }
      }}
    >
      {/* Loading Progress Bar */}
      {loading && (
        <LinearProgress 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            '& .MuiLinearProgress-bar': {
              background: `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
            }
          }} 
        />
      )}

      <DialogTitle sx={{ textAlign: 'center', pb: 2, pt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 10,
                delay: 0.2 
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.35)}, 0 0 0 1px ${alpha(theme.palette.common.white, 0.15)}`,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -2,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
                    zIndex: -1,
                    opacity: 0.3,
                    filter: 'blur(8px)',
                  }
                }}
              >
                <AdminPanelSettings fontSize="large" />
              </Box>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography variant="h5" fontWeight={700} sx={{ 
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5,
              }}>
                Admin Access
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Secure authentication required
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, px: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            autoComplete="off"
            sx={{ mt: 1 }}
          >
            {/* Hidden dummy fields to prevent autofill */}
            <input type="text" style={{ display: 'none' }} />
            <input type="password" style={{ display: 'none' }} />
            
            {error && (
              <Fade in={!!error}>
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 2, 
                    borderRadius: 2,
                    background: alpha(theme.palette.error.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                    color: theme.palette.error.main,
                  }}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="admin-username-field"
              label="Username"
              name="username"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              autoFocus
              value={credentials.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                'data-form-type': 'other',
                'data-lpignore': 'true',
                'data-1p-ignore': 'true',
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: alpha(theme.palette.background.paper, 0.9),
                    borderColor: 'primary.main',
                    transform: 'translateY(-1px)',
                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                  },
                  '&.Mui-focused': {
                    background: theme.palette.background.paper,
                    borderColor: 'primary.main',
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
                '& .MuiOutlinedInput-input': {
                  color: 'text.primary',
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="admin-password-field"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={credentials.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                'data-form-type': 'other',
                'data-lpignore': 'true',
                'data-1p-ignore': 'true',
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: alpha(theme.palette.background.paper, 0.9),
                    borderColor: 'primary.main',
                    transform: 'translateY(-1px)',
                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                  },
                  '&.Mui-focused': {
                    background: theme.palette.background.paper,
                    borderColor: 'primary.main',
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'text.secondary',
                },
                '& .MuiOutlinedInput-input': {
                  color: 'text.primary',
                },
              }}
            />
          </Box>
        </motion.div>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            onClick={handleClose} 
            variant="outlined"
            disabled={loading}
            sx={{ 
              borderRadius: 3, 
              minWidth: 100,
              borderColor: alpha(theme.palette.primary.main, 0.4),
              color: theme.palette.primary.main,
              backgroundColor: 'transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                background: alpha(theme.palette.primary.main, 0.05),
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
              },
              '&:disabled': {
                opacity: 0.5,
              },
            }}
          >
            Cancel
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !credentials.username || !credentials.password}
            sx={{ 
              borderRadius: 3, 
              minWidth: 100,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                background: theme.palette.action.disabledBackground,
                color: theme.palette.text.disabled,
                boxShadow: 'none',
              },
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </motion.div>
      </DialogActions>
    </Dialog>
  );
};

export default AdminLoginDialog;
