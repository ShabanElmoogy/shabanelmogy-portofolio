import { Box, CircularProgress } from '@mui/material';
import AdminHeader from '@/features/admin/components/AdminHeader';
import AdminSidebar from '@/features/admin/components/AdminSidebar';
import ProjectsView from '@/features/admin/projects/ProjectsView';
import CategoriesView from '@/features/admin/categories/CategoriesView';
import TechnologiesView from '@/features/admin/technologies/TechnologiesView';
import BusinessTypesView from '@/features/admin/businessType/BusinessTypesView';
import { useAdminPanel } from '@/features/admin/hooks/useAdminPanel';

const AdminPanelContent = () => {
  const {
    view,
    setView,
    loading,
    projects,
    categories,
    businessTypes,
    technologies,
    fetchProjects,
    handlers
  } = useAdminPanel();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AdminHeader />
      
      {/* Main Layout Container - positioned below fixed header */}
      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        {/* Sidebar */}
        <AdminSidebar view={view} setView={setView} />
        
        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <Box sx={{ 
            maxWidth: 1200, 
            mx: 'auto'
          }}>
            {view === 'projects' && (
              <ProjectsView
                projects={projects}
                categories={categories}
                businessTypes={businessTypes}
                technologies={technologies}
                loading={loading}
                onCreateProject={handlers.project.create}
                onUpdateProject={handlers.project.update}
                onDeleteProject={handlers.project.delete}
                onRefreshProjects={fetchProjects}
              />
            )}
            
            {view === 'categories' && (
              <CategoriesView
                categories={categories}
                loading={loading}
                onCreateCategory={handlers.category.create}
                onUpdateCategory={handlers.category.update}
                onDeleteCategory={handlers.category.delete}
              />
            )}

            {view === 'businessTypes' && (
              <BusinessTypesView
                businessTypes={businessTypes}
                loading={loading}
                onCreateBusinessType={handlers.businessType.create}
                onUpdateBusinessType={handlers.businessType.update}
                onDeleteBusinessType={handlers.businessType.delete}
              />
            )}

            {view === 'technologies' && (
              <TechnologiesView
                technologies={technologies}
                loading={loading}
                onCreateTechnology={handlers.technology.create}
                onUpdateTechnology={handlers.technology.update}
                onDeleteTechnology={handlers.technology.delete}
              />
            )}
          </Box>
        </Box>
      </Box>
        
      {/* Loading Spinner Overlay */}
      {loading && (
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          bgcolor: 'rgba(255,255,255,0.4)', 
          zIndex: 2000, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <CircularProgress size={60} thickness={5} />
        </Box>
      )}
    </Box>
  );
};

const AdminPanel = () => {
  return <AdminPanelContent />;
};

export default AdminPanel;