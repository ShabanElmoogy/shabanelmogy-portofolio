/* eslint-disable react/prop-types */
import { Box, Button, Stack, TextField } from "@mui/material";

const MediaUpload = ({ imgPath, errors, uploadingMain, onUrlChange, onFileSelected }) => {
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          fullWidth
          label="Main Image URL"
          value={imgPath}
          onChange={(e) => onUrlChange(e.target.value)}
          error={!!errors.imgPath}
          helperText={errors.imgPath}
          required
          sx={{ flex: 1 }}
        />
        <Button
          variant="outlined"
          component="label"
          disabled={uploadingMain}
        >
          {uploadingMain ? 'Uploading...' : 'Upload'}
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileSelected(file);
              e.target.value = '';
            }}
          />
        </Button>
      </Stack>
      {imgPath && (
        <Box sx={{ mt: 1 }}>
          <img src={imgPath} alt="Main preview" style={{ maxHeight: 120, borderRadius: 6 }} />
        </Box>
      )}
    </>
  );
};

export default MediaUpload;
