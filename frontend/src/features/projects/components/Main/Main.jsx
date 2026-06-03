import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Pagination,
  Alert
} from "@mui/material";
import { useTheme } from "@/providers/ThemeContext";
import ProjectDialog from "@/features/admin/projects/ProjectDialog";
import DeleteConfirmDialog from "@/features/admin/shared/DeleteConfirmDialog";
import FilterBar from "@/features/projects/components/Main/components/FilterBar";
import LoadingSkeletonGrid from "@/features/projects/components/Main/components/LoadingSkeletonGrid";
import ProjectsGrid from "@/features/projects/components/Main/components/ProjectsGrid";
import EmptyProjectsState from "@/features/projects/components/Main/components/EmptyProjectsState";
import useProjectListing from "@/features/projects/components/Main/hooks/useProjectListing";
import { API_URL as API_BASE } from "@/config";
import http from "@/api/httpClient";

const API_URL = `${API_BASE}/projects`;

const Main = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const {
    projects,
    setProjects,
    categories,
    businessTypes,
    technologies,
    loading,
    error,
    setError,
    selectedBusinessType,
    selectedCategory,
    selectedTechnology,
    handleBusinessTypeFilter,
    handleCategoryFilter,
    handleTechnologyFilter,
    clearAllFilters,
    currentPage,
    itemsPerPage,
    totalPages,
    currentItems,
    handlePageChange,
    fetchProjects,
  } = useProjectListing(6);

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [adminMode, setAdminMode] = useState(false);

  // Project management functions
  const handleProjectSaved = (savedProject) => {
    if (selectedProject) {
      setProjects(prev => prev.map(p => p.id === savedProject.id ? savedProject : p));
    } else {
      setProjects(prev => [savedProject, ...prev]);
    }
    setDialogOpen(false);
    setSelectedProject(null);
  };

  const handleAddProject = () => {
    setSelectedProject(null);
    setDialogOpen(true);
  };

  const handleEditProject = (project, event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleDeleteProject = (project, event) => {
    event.preventDefault();
    event.stopPropagation();
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      await http.delete(`${API_URL.replace(API_BASE, "")}/${projectToDelete.id}`);
      setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Failed to delete project. Please try again.');
    }
  };

  // Initial data is handled within the hook

  
  
  const handleOpenUrl = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, position: 'relative' }}>
      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Admin Mode Indicator */}
      {adminMode && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Admin Mode Active:</strong> You can now add, edit, and delete projects. Click on the edit or delete icons on project cards.
        </Alert>
      )}

      {/* Filters */}
      <FilterBar
        isDark={isDark}
        selectedBusinessType={selectedBusinessType}
        selectedCategory={selectedCategory}
        selectedTechnology={selectedTechnology}
        businessTypes={businessTypes}
        categories={categories}
        technologies={technologies}
        onBusinessTypeChange={handleBusinessTypeFilter}
        onCategoryChange={handleCategoryFilter}
        onTechnologyChange={handleTechnologyFilter}
        onClearAll={clearAllFilters}
      />

      {/* Projects Grid - Two Rows */}
      <Box>
        {loading ? (
          <LoadingSkeletonGrid count={itemsPerPage} />
        ) : currentItems.length === 0 ? (
          <EmptyProjectsState
            isDark={isDark}
            selectedBusinessType={selectedBusinessType}
            selectedCategory={selectedCategory}
            selectedTechnology={selectedTechnology}
            onClearAll={clearAllFilters}
          />
        ) : (
          <ProjectsGrid
            items={currentItems}
            isDark={isDark}
            adminMode={adminMode}
            onOpenUrl={handleOpenUrl}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onNavigate={(id) => navigate(`/project/${id}`)}
          />
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{ '& .MuiPaginationItem-root': { borderRadius: 2 } }}
            />
          </Box>
        )}
      </Box>

      {/* Project Dialog */}
      <ProjectDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onSave={handleProjectSaved}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onCancel={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        itemName={projectToDelete?.title}
        description="Are you sure you want to delete this project? This action cannot be undone."
      />
    </Container>
  );
};

export default Main;