import { useState, useEffect } from "react";
import http from "@/api/httpClient";

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTechnologies = async () => {
    setLoading(true);
    try {
      const data = await http.get(`/technologies`);
      setTechnologies(data);
      console.log('Fetched technologies:', data);
      return { success: true, data };
    } catch (err) {
      console.error('Failed to load technologies:', err);
      return { success: false, error: 'Failed to load technologies' };
    } finally {
      setLoading(false);
    }
  };

  const createTechnology = async (technologyData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first
      const existingTech = technologies.find(tech => 
        tech.name.toLowerCase().trim() === technologyData.name.toLowerCase().trim()
      );
      
      if (existingTech) {
        return { success: false, error: 'A technology with this name already exists' };
      }

      await http.post(`/technologies`, technologyData);
      await fetchTechnologies();
      return { success: true, message: 'Technology added successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateTechnology = async (id, technologyData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first (excluding current technology)
      const existingTech = technologies.find(tech => 
        tech.name.toLowerCase().trim() === technologyData.name.toLowerCase().trim() && 
        tech.id !== id
      );
      
      if (existingTech) {
        return { success: false, error: 'A technology with this name already exists' };
      }

      await http.put(`/technologies/${id}`, technologyData);
      await fetchTechnologies();
      return { success: true, message: 'Technology updated successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteTechnology = async (id) => {
    // Confirmation is handled in the UI component
    setLoading(true);
    try {
      await http.delete(`/technologies/${id}`);
      await fetchTechnologies();
      return { success: true, message: 'Technology deleted successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return {
    technologies,
    loading,
    fetchTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology
  };
};
