// @ts-nocheck
/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Stack,
  Slide,
  IconButton,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/*
  Reusable compact themed delete confirmation dialog.

  Props:
  - open: boolean
  - onCancel: () => void
  - onConfirm: () => Promise<void> | void
  - title?: string (default: 'Delete Item?')
  - itemName?: string (optional quoted primary label)
  - description?: string (default generic destructive message)
  - loading?: boolean (shows Deleting... and disables actions)
  - previewContent?: ReactNode (optional additional preview block)
  - maxWidth?: Dialog maxWidth (default 'xs')
  - fullWidth?: boolean (default true)
  - confirmText?: string (default 'Delete')
  - cancelText?: string (default 'Cancel')
*/
const DeleteConfirmDialog = ({
  open,
  onCancel,
  onConfirm,
  title = 'Delete Item?',
  itemName,
  description = 'This action cannot be undone. The item and all its data will be permanently deleted.',
  loading = false,
  previewContent = null,
  maxWidth = 'xs',
  fullWidth = true,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onCancel}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.98)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[16],
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(8px)',
          backgroundColor: alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.6 : 0.3),
        },
      }}
    >
      <DialogContent sx={{ p: 3, textAlign: 'center' }}>
        {/* Close button */}
        <IconButton
          onClick={onCancel}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.text.secondary,
            '&:hover': {
              bgcolor: theme.palette.action.hover,
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Warning Icon */}
        <Avatar
          sx={{
            bgcolor: alpha(theme.palette.error.main, 0.15),
            width: 64,
            height: 64,
            mx: 'auto',
            mb: 2,
            border: `2px solid ${alpha(theme.palette.error.main, 0.25)}`,
          }}
        >
          <WarningAmberIcon sx={{ fontSize: 32, color: theme.palette.error.main }} />
        </Avatar>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 1, color: theme.palette.text.primary }}
        >
          {title}
        </Typography>

        {/* Primary item label */}
        {itemName && (
          <Typography
            variant="body2"
            sx={{ mb: 2, color: theme.palette.text.secondary, fontWeight: 500 }}
          >
            &quot;{itemName}&quot;
          </Typography>
        )}

        {/* Message */}
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary, lineHeight: 1.5, mb: 3 }}
        >
          {description}
        </Typography>

        {/* Optional preview block */}
        {previewContent && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.error.main, 0.05),
              border: `1px solid ${alpha(theme.palette.error.main, 0.15)}`,
              mb: 3,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {previewContent}
            </Stack>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 1.5 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          startIcon={<CancelIcon />}
          disabled={loading}
          fullWidth
          sx={{
            borderRadius: 2,
            py: 1.2,
            textTransform: 'none',
            fontWeight: 600,
            borderColor: theme.palette.divider,
            color: theme.palette.text.secondary,
            '&:hover': {
              borderColor: theme.palette.text.secondary,
              bgcolor: theme.palette.action.hover,
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          startIcon={loading ? null : <DeleteIcon />}
          disabled={loading}
          fullWidth
          sx={{
            borderRadius: 2,
            py: 1.2,
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: theme.palette.error.main,
            color: theme.palette.getContrastText(theme.palette.error.main),
            boxShadow: `0 4px 12px ${alpha(theme.palette.error.main, 0.25)}`,
            '&:hover': {
              bgcolor: theme.palette.error.dark,
              boxShadow: `0 6px 16px ${alpha(theme.palette.error.main, 0.35)}`,
              transform: 'translateY(-1px)',
            },
            '&:disabled': {
              bgcolor: theme.palette.action.disabledBackground,
              color: theme.palette.text.disabled,
            },
          }}
        >
          {loading ? 'Deleting...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
