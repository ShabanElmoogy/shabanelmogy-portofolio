import { useState, useEffect } from "react";
import http from "@/api/httpClient";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await http.get(`/projects`);
      setProjects(data);
      return { success: true, data };
    } catch (err) {
      console.error('Failed to load projects:', err);
      return { success: false, error: 'Failed to load projects' };
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    setLoading(true);
    console.log("projects Data",projectData)
    try {
      await http.post(`/projects`, { 
        ...projectData, 
        businessTypeId: projectData.businessTypeId ? Number(projectData.businessTypeId) : null,
        categoryId: projectData.categoryId ? Number(projectData.categoryId) : null,
        featured: Boolean(projectData.featured)
      });
      await fetchProjects();
      return { success: true, message: 'Project added' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, projectData) => {
    setLoading(true);
    try {
      await http.put(`/projects/${id}`, { 
        ...projectData, 
        businessTypeId: projectData.businessTypeId ? Number(projectData.businessTypeId) : null,
        categoryId: projectData.categoryId ? Number(projectData.categoryId) : null,
        featured: Boolean(projectData.featured)
      });
      await fetchProjects();
      return { success: true, message: 'Project updated' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    // Removed window.confirm - confirmation is now handled in the UI component
    setLoading(true);
    try {
      await http.delete(`/projects/${id}`);
      await fetchProjects();
      return { success: true, message: 'Project deleted' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
};