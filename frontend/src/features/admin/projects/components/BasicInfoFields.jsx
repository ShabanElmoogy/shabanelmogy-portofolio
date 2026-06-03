/* eslint-disable react/prop-types */
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const BasicInfoFields = ({ formData, errors, businessTypes, categories, handleInputChange }) => {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Basic Information
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Project Title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          required
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth>
          <InputLabel>Business Type</InputLabel>
          <Select
            value={formData.businessTypeId}
            onChange={(e) => handleInputChange('businessTypeId', e.target.value)}
            label="Business Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {businessTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.categoryId}
            onChange={(e) => handleInputChange('categoryId', e.target.value)}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default BasicInfoFields;
