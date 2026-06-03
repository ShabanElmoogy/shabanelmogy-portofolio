/* eslint-disable react/prop-types */
import { Box, Paper, Stack, Typography, Grid, Chip, Button, useTheme } from "@mui/material";
import { alpha } from '@mui/material/styles';
import FilterAutocomplete from "@/features/projects/components/Main/components/filter-bar/FilterAutocomplete";

const FilterBar = ({
  selectedBusinessType,
  selectedCategory,
  selectedTechnology,
  businessTypes,
  categories,
  technologies,
  onBusinessTypeChange,
  onCategoryChange,
  onTechnologyChange,
  onClearAll,
}) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha(theme.palette.common.white, 0.05)} 0%, ${alpha(theme.palette.common.white, 0.02)} 100%)`
          : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: theme.palette.mode === 'dark'
          ? `1px solid ${alpha(theme.palette.common.white, 0.1)}`
          : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 32px rgba(0,0,0,0.2)'
          : `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`
      }}
    >
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Filter Projects
        </Typography>
      </Stack>

      {/* Active Filters */}
      {(selectedBusinessType !== "all" || selectedCategory !== "all" || selectedTechnology !== "all") && (
        <Box sx={{ mb: 3, p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" gap={1}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
              Active:
            </Typography>
            {selectedBusinessType !== "all" && (
              <Chip
                label={selectedBusinessType}
                onDelete={() => onBusinessTypeChange("all")}
                color="info"
                size="small"
                sx={{ fontWeight: 500 }}
              />
            )}
            {selectedCategory !== "all" && (
              <Chip
                label={selectedCategory}
                onDelete={() => onCategoryChange("all")}
                color="primary"
                size="small"
                sx={{ fontWeight: 500 }}
              />
            )}
            {selectedTechnology !== "all" && (
              <Chip
                label={selectedTechnology}
                onDelete={() => onTechnologyChange("all")}
                color="secondary"
                size="small"
                sx={{ fontWeight: 500 }}
              />
            )}
            <Button
              size="small"
              onClick={onClearAll}
              sx={{ textTransform: 'none', fontWeight: 500, minWidth: 'auto' }}
            >
              Clear All
            </Button>
          </Stack>
        </Box>
      )}

      {/* Filters Grid */}
      <Grid container spacing={3} alignItems="center">
        {/* Business Types Autocomplete */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FilterAutocomplete
            label="Search Business Types"
            placeholder="Type to search business types..."
            color="info"
            value={selectedBusinessType}
            options={businessTypes}
            onChange={onBusinessTypeChange}
            clearText="Clear"
            noOptionsText="No business types found"
          />
        </Grid>

        {/* Categories Autocomplete */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FilterAutocomplete
            label="Search Categories"
            placeholder="Type to search categories..."
            color="primary"
            value={selectedCategory}
            options={categories}
            onChange={onCategoryChange}
            clearText="Clear"
            noOptionsText="No categories found"
          />
        </Grid>

        {/* Technologies Autocomplete */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FilterAutocomplete
            label="Search Technologies"
            placeholder="Type to search technologies..."
            color="secondary"
            value={selectedTechnology}
            options={technologies}
            onChange={onTechnologyChange}
            clearText="Clear"
            noOptionsText="No technologies found"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterBar;
