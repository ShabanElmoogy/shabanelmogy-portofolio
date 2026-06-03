/* eslint-disable react/prop-types */
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {(e:any) => void} [props.onSubmit]
 * @param {string} props.title
 * @param {any} props.children
 * @param {boolean} [props.loading]
 * @param {string} [props.submitText]
 * @param {string} [props.cancelText]
 * @param {import('@mui/material').Breakpoint | false} [props.maxWidth]
 * @param {string} [props.error]
 * @param {boolean} [props.isValid]
 * @param {boolean} [props.showCloseIcon]
 */
const BaseDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  title, 
  children, 
  loading = false,
  submitText = 'Save',
  cancelText = 'Cancel',
  maxWidth = 'sm',
  error = '',
  isValid = true,
  showCloseIcon = true
}) => {
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={/** @type {import('@mui/material').Breakpoint | false} */ (maxWidth)} 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[16],
          overflow: 'hidden',
        }
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(8px)',
          backgroundColor: alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.6 : 0.3),
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          fontWeight: 700,
          fontSize: '1.5rem',
          pb: 2,
          pt: 3,
          px: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5" component="span" sx={{ 
          fontWeight: 'inherit',
          background: 'inherit',
          backgroundClip: 'inherit',
          WebkitBackgroundClip: 'inherit',
          WebkitTextFillColor: 'inherit',
        }}>
          {title}
        </Typography>
        {showCloseIcon && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ pt: 2, px: 3, pb: 1 }}>
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2, 
              borderRadius: 2,
              background: alpha(theme.palette.error.main, 0.1),
              border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
              color: theme.palette.error.main,
              '& .MuiAlert-icon': {
                color: theme.palette.error.main,
              },
            }}
          >
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {children}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ 
            borderRadius: 3, 
            minWidth: 100,
            borderColor: alpha(theme.palette.primary.main, 0.4),
            color: theme.palette.primary.main,
            fontWeight: 500,
            '&:hover': {
              borderColor: theme.palette.primary.main,
              background: alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !isValid}
          sx={{ 
            borderRadius: 3, 
            minWidth: 100,
            fontWeight: 600,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
            },
            '&:disabled': {
              background: theme.palette.action.disabledBackground,
              color: theme.palette.text.disabled,
            },
          }}
        >
          {loading ? 'Saving...' : submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BaseDialog;
