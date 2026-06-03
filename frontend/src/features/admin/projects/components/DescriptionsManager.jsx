/* eslint-disable react/prop-types */
import { Box, Button, Chip, Divider, IconButton, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, DragHandle as DragHandleIcon, Tab as TabIcon } from "@mui/icons-material";

const DescriptionsManager = ({
  usedCategories,
  activeTab,
  setActiveTab,
  newCategoryName,
  setNewCategoryName,
  categoryError,
  setCategoryError,
  getDescriptionsByCategory,
  currentCategory,
  currentCategoryDescriptions,
  formData,
  errors,
  addNewCategory,
  removeDescriptionSection,
  handleDescriptionChange,
  handlePointChange,
  removePoint,
  addPoint,
  addDescriptionSection,
}) => {
  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {usedCategories.map((category) => (
            <Tab
              key={category}
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TabIcon fontSize="small" />
                  <span>{category}</span>
                  <Chip
                    label={getDescriptionsByCategory(category).length}
                    size="small"
                    color="primary"
                    sx={{ minWidth: 20, height: 20 }}
                  />
                </Stack>
              }
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Add New Category */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
            Add New Category
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              size="small"
              label="Category name"
              value={newCategoryName}
              onChange={(e) => { setNewCategoryName(e.target.value); if (categoryError) setCategoryError(''); }}
              error={!!categoryError}
              helperText={categoryError}
            />
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={addNewCategory}
            >
              Add Category
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Current Category Sections */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {currentCategory} Sections
        </Typography>

        {currentCategoryDescriptions.map((description, localIndex) => {
          const globalIndex = formData.descriptions.findIndex(d => d === description);
          return (
            <Paper
              key={globalIndex}
              elevation={1}
              sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {currentCategory} Section {localIndex + 1}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" color="primary">
                    <DragHandleIcon />
                  </IconButton>
                  {currentCategoryDescriptions.length > 1 && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeDescriptionSection(globalIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Stack>
              </Stack>

              <TextField
                fullWidth
                label="Section Title"
                value={description.title}
                onChange={(e) => handleDescriptionChange(globalIndex, 'title', e.target.value)}
                error={!!errors[`description_${globalIndex}_title`]}
                helperText={errors[`description_${globalIndex}_title`]}
                sx={{ mb: 2 }}
                placeholder={`e.g., ${currentCategory} Details, Key ${currentCategory} Points`}
                required
              />

              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Bullet Points <Chip label="Multi-line supported" size="small" color="info" sx={{ ml: 1 }} />
              </Typography>

              {description.points.map((point, pointIndex) => (
                <Stack key={pointIndex} direction="row" spacing={1} sx={{ mb: 2, alignItems: 'flex-start' }}>
                  <Typography sx={{ mt: 1, color: 'text.secondary', minWidth: 16 }}>•</Typography>
                  <TextField
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={6}
                    value={point}
                    onChange={(e) => handlePointChange(globalIndex, pointIndex, e.target.value)}
                    placeholder="Enter a bullet point... (supports multiple lines)"
                    sx={{ flex: 1 }}
                  />
                  {description.points.length > 1 && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removePoint(globalIndex, pointIndex)}
                      sx={{ mt: 0.5 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Stack>
              ))}

              {errors[`description_${globalIndex}_points`] && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                  {errors[`description_${globalIndex}_points`]}
                </Typography>
              )}

              <Button
                startIcon={<AddIcon />}
                onClick={() => addPoint(globalIndex)}
                size="small"
                sx={{ mt: 1 }}
              >
                Add Bullet Point
              </Button>
            </Paper>
          );
        })}

        <Button
          startIcon={<AddIcon />}
          onClick={() => addDescriptionSection(currentCategory)}
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Section to {currentCategory}
        </Button>
      </Box>
    </Paper>
  );
};

export default DescriptionsManager;
