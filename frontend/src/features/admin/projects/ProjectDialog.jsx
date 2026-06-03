/* eslint-disable react/prop-types */
// @ts-ignore
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography } from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import ErrorAlerts from '@/features/admin/projects/components/ErrorAlerts';
import BasicInfoFields from '@/features/admin/projects/components/BasicInfoFields';
import MediaUpload from '@/features/admin/projects/components/MediaUpload';
import GalleryManager from '@/features/admin/projects/components/GalleryManager';
import LinksFields from '@/features/admin/projects/components/LinksFields';
import TechnologiesSettings from '@/features/admin/projects/components/TechnologiesSettings';
import DescriptionsManager from '@/features/admin/projects/components/DescriptionsManager';
import useProjectDialog from '@/features/admin/projects/hooks/useProjectDialog';

const ProjectDialog = ({ open, onClose, project = null, onSave }) => {
  const {
    // state
    formData,
    categories,
    businessTypes,
    technologies,
    loading,
    errors,
    activeTab,
    uploadingMain,
    uploadingIndex,
    newCategoryName,
    categoryError,
    // derived
    usedCategories,
    currentCategory,
    currentCategoryDescriptions,
    // setters
    setActiveTab,
    setNewCategoryName,
    setCategoryError,
    // handlers
    handleInputChange,
    handleDescriptionChange,
    handlePointChange,
    addPoint,
    removePoint,
    addImage,
    removeImage,
    handleImageChange,
    handleMainImageFile,
    handleGalleryImageFile,
    addNewCategory,
    addDescriptionSection,
    removeDescriptionSection,
    handleSave,
  } = useProjectDialog({ open, project, onSave, onClose });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth PaperProps={{ sx: { minHeight: '85vh' } }}>
      <DialogTitle>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {project ? 'Edit Project' : 'Add New Project'}
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <ErrorAlerts errors={errors} />

        <Grid container spacing={3}>
          <BasicInfoFields
            formData={formData}
            errors={errors}
            businessTypes={businessTypes}
            categories={categories}
            handleInputChange={handleInputChange}
          />

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 2 }}>
              URLs & Media
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <MediaUpload
              imgPath={formData.imgPath}
              errors={errors}
              uploadingMain={uploadingMain}
              onUrlChange={(val) => handleInputChange('imgPath', val)}
              onFileSelected={handleMainImageFile}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <GalleryManager
              images={formData.images}
              errors={errors}
              uploadingIndex={uploadingIndex}
              onAdd={addImage}
              onRemove={removeImage}
              onChange={handleImageChange}
              onUpload={handleGalleryImageFile}
            />
          </Grid>

          <LinksFields formData={formData} errors={errors} handleInputChange={handleInputChange} />

          <TechnologiesSettings technologies={technologies} formData={formData} handleInputChange={handleInputChange} />

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', mt: 2 }}>
              Project Descriptions
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Organize your project descriptions into categories. Each category can have multiple sections.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <DescriptionsManager
              usedCategories={usedCategories}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              newCategoryName={newCategoryName}
              setNewCategoryName={setNewCategoryName}
              categoryError={categoryError}
              setCategoryError={setCategoryError}
              getDescriptionsByCategory={(category) => formData.descriptions.filter((d) => d.category === category)}
              currentCategory={currentCategory}
              currentCategoryDescriptions={currentCategoryDescriptions}
              formData={formData}
              errors={errors}
              addNewCategory={addNewCategory}
              removeDescriptionSection={removeDescriptionSection}
              handleDescriptionChange={handleDescriptionChange}
              handlePointChange={handlePointChange}
              removePoint={removePoint}
              addPoint={addPoint}
              addDescriptionSection={addDescriptionSection}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} startIcon={<CancelIcon />} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" startIcon={<SaveIcon />} disabled={loading}>
          {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDialog;