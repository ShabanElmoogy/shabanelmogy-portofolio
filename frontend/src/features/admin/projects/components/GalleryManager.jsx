/* eslint-disable react/prop-types */
import { Box, Button, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const GalleryManager = ({ images, errors, uploadingIndex, onAdd, onRemove, onChange, onUpload }) => {
  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Gallery Images
          </Typography>
          <Button startIcon={<AddIcon />} size="small" onClick={onAdd}>
            Add Image
          </Button>
        </Stack>

        {images.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No gallery images added. Use &quot;Add Image&quot; to include more images in the gallery.
          </Typography>
        )}

        {images.map((img, index) => (
          <Paper key={index} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField
                  fullWidth
                  label="Image URL"
                  value={img.imageUrl || ''}
                  onChange={(e) => onChange(index, 'imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  error={!!errors[`image_${index}_imageUrl`]}
                  helperText={errors[`image_${index}_imageUrl`]}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Alt Text"
                  value={img.altText || ''}
                  onChange={(e) => onChange(index, 'altText', e.target.value)}
                  placeholder="Short description"
                />
              </Grid>
            </Grid>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
              <Box>
                {img.imageUrl ? (
                  <img src={img.imageUrl} alt={img.altText || `Image ${index + 1}`} style={{ maxHeight: 80, borderRadius: 4 }} />
                ) : null}
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  component="label"
                  disabled={uploadingIndex === index}
                >
                  {uploadingIndex === index ? 'Uploading...' : 'Upload'}
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onUpload(index, file);
                      e.target.value = '';
                    }}
                  />
                </Button>
                <IconButton color="error" onClick={() => onRemove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
};

export default GalleryManager;
