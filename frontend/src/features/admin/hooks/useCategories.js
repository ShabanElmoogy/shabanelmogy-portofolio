import { useState, useEffect } from "react";
import http from "@/api/httpClient";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await http.get(`/categories`);
      setCategories(data);
      console.log('Fetched categories:', data);
      return { success: true, data };
    } catch (err) {
      console.error('Failed to load categories:', err);
      return { success: false, error: 'Failed to load categories' };
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first
      const existingCategory = categories.find(cat => 
        cat.name.toLowerCase().trim() === categoryData.name.toLowerCase().trim()
      );
      
      if (existingCategory) {
        return { success: false, error: 'A category with this name already exists' };
      }

      await http.post(`/categories`, categoryData);
      await fetchCategories();
      return { success: true, message: 'Category added successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, categoryData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first (excluding current category)
      const existingCategory = categories.find(cat => 
        cat.name.toLowerCase().trim() === categoryData.name.toLowerCase().trim() && 
        cat.id !== id
      );
      
      if (existingCategory) {
        return { success: false, error: 'A category with this name already exists' };
      }

      await http.put(`/categories/${id}`, categoryData);
      await fetchCategories();
      return { success: true, message: 'Category updated successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    // Confirmation is handled in the UI component
    setLoading(true);
    try {
      await http.delete(`/categories/${id}`);
      await fetchCategories();
      return { success: true, message: 'Category deleted successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};
