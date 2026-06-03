import { useState } from "react";
import { useProjects } from '@/features/admin/hooks/useProjects';
import { useCategories } from '@/features/admin/hooks/useCategories';
import { useTechnologies } from '@/features/admin/hooks/useTechnologies';
import { useBusinessTypes } from '@/features/admin/hooks/useBusinessTypes';

export const useAdminPanel = () => {
  const [view, setView] = useState("projects");

  const {
    projects,
    loading: projectsLoading,
    createProject,
    updateProject,
    deleteProject,
    fetchProjects
  } = useProjects();

  const {
    categories,
    loading: categoriesLoading,
    createCategory,
    updateCategory,
    deleteCategory
  } = useCategories();

  const {
    technologies,
    loading: technologiesLoading,
    createTechnology,
    updateTechnology,
    deleteTechnology
  } = useTechnologies();

  const {
    businessTypes,
    loading: businessTypesLoading,
    createBusinessType,
    updateBusinessType,
    deleteBusinessType
  } = useBusinessTypes();

  const loading = projectsLoading || categoriesLoading || technologiesLoading || businessTypesLoading;

  // Project handlers
  const handleCreateProject = async (projectData) => {
    return await createProject(projectData);
  };

  const handleUpdateProject = async (id, projectData) => {
    return await updateProject(id, projectData);
  };

  const handleDeleteProject = async (id) => {
    return await deleteProject(id);
  };

  // Category handlers
  const handleCreateCategory = async (categoryData) => {
    const result = await createCategory(categoryData);
    if (result.success) fetchProjects();
    return result;
  };

  const handleUpdateCategory = async (id, categoryData) => {
    const result = await updateCategory(id, categoryData);
    if (result.success) fetchProjects();
    return result;
  };

  const handleDeleteCategory = async (id) => {
    const result = await deleteCategory(id);
    if (result.success) fetchProjects();
    return result;
  };

  // Business type handlers
  const handleCreateBusinessType = async (businessTypeData) => {
    const result = await createBusinessType(businessTypeData);
    if (result.success) fetchProjects();
    return result;
  };

  const handleUpdateBusinessType = async (id, businessTypeData) => {
    const result = await updateBusinessType(id, businessTypeData);
    if (result.success) fetchProjects();
    return result;
  };

  const handleDeleteBusinessType = async (id) => {
    const result = await deleteBusinessType(id);
    if (result.success) fetchProjects();
    return result;
  };

  // Technology handlers
  const handleCreateTechnology = async (technologyData) => {
    const result = await createTechnology(technologyData);
    if (result.success) fetchProjects();
    return result;
  };

  const handleUpdateTechnology = async (id, technologyData) => {
    const result = await updateTechnology(id, technologyData);
    if (result.success) fetchProjects();
    return result;
  };

  const handleDeleteTechnology = async (id) => {
    const result = await deleteTechnology(id);
    if (result.success) fetchProjects();
    return result;
  };

  return {
    view,
    setView,
    loading,
    projects,
    categories,
    businessTypes,
    technologies,
    fetchProjects,
    handlers: {
      project: {
        create: handleCreateProject,
        update: handleUpdateProject,
        delete: handleDeleteProject
      },
      category: {
        create: handleCreateCategory,
        update: handleUpdateCategory,
        delete: handleDeleteCategory
      },
      businessType: {
        create: handleCreateBusinessType,
        update: handleUpdateBusinessType,
        delete: handleDeleteBusinessType
      },
      technology: {
        create: handleCreateTechnology,
        update: handleUpdateTechnology,
        delete: handleDeleteTechnology
      }
    }
  };
};
