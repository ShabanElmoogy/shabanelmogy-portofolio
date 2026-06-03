import { useState, useEffect } from 'react';
import { API_URL as API_BASE } from '@/config';
import http from '@/api/httpClient';

const API_URL = `${API_BASE}/projects`;

export const useAdminPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await http.get(API_URL.replace(API_BASE, ""));
      setProjects(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects. Please try again.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setSelectedProject(null);
    setDialogOpen(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleDeleteProject = (project) => {
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

  const handleProjectSaved = (savedProject) => {
    if (selectedProject) {
      setProjects(prev => prev.map(p => p.id === savedProject.id ? savedProject : p));
    } else {
      setProjects(prev => [savedProject, ...prev]);
    }
    setDialogOpen(false);
    setSelectedProject(null);
  };

  return {
    projects,
    loading,
    error,
    setError,
    dialogOpen,
    setDialogOpen,
    selectedProject,
    setSelectedProject,
    deleteDialogOpen,
    setDeleteDialogOpen,
    projectToDelete,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    confirmDelete,
    handleProjectSaved
  };
};
