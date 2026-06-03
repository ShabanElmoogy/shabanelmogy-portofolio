/* eslint-disable react/prop-types */
import { Autocomplete, Chip, FormControlLabel, Switch, TextField, Typography, Grid } from "@mui/material";

const TechnologiesSettings = ({ technologies, formData, handleInputChange }) => {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 2 }}>
          Technologies & Settings
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Autocomplete
          multiple
          options={technologies}
          getOptionLabel={(option) => option.name}
          value={technologies.filter(tech => formData.technologyIds.includes(tech.id))}
          onChange={(event, newValue) => {
            handleInputChange('technologyIds', newValue.map(tech => tech.id));
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option.name}
                {...getTagProps({ index })}
                key={option.id}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Technologies"
              placeholder="Select technologies"
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.featured}
              onChange={(e) => handleInputChange('featured', e.target.checked)}
            />
          }
          label="Featured Project"
        />
      </Grid>
    </>
  );
};

export default TechnologiesSettings;
