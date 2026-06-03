/* eslint-disable react/prop-types */
import { Grid, TextField } from "@mui/material";

const LinksFields = ({ formData, errors, handleInputChange }) => {
  return (
    <>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="GitHub URL"
          value={formData.githubUrl}
          onChange={(e) => handleInputChange('githubUrl', e.target.value)}
          error={!!errors.githubUrl}
          helperText={errors.githubUrl}
          required
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          label="Preview URL"
          value={formData.previewUrl}
          onChange={(e) => handleInputChange('previewUrl', e.target.value)}
          error={!!errors.previewUrl}
          helperText={errors.previewUrl}
          required
        />
      </Grid>
    </>
  );
};

export default LinksFields;
