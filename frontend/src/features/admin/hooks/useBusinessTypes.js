import { useState, useEffect } from "react";
import http from "@/api/httpClient";

export const useBusinessTypes = () => {
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBusinessTypes = async () => {
    setLoading(true);
    try {
      const data = await http.get(`/business-types`);
      setBusinessTypes(data);
      console.log('Fetched business types:', data);
      return { success: true, data };
    } catch (err) {
      console.error('Failed to load business types:', err);
      return { success: false, error: 'Failed to load business types' };
    } finally {
      setLoading(false);
    }
  };

  const createBusinessType = async (businessTypeData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first
      const existing = businessTypes.find(bt => 
        bt.name.toLowerCase().trim() === businessTypeData.name.toLowerCase().trim()
      );
      
      if (existing) {
        return { success: false, error: 'A business type with this name already exists' };
      }

      await http.post(`/business-types`, businessTypeData);
      await fetchBusinessTypes();
      return { success: true, message: 'Business type added successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateBusinessType = async (id, businessTypeData) => {
    setLoading(true);
    try {
      // Check for duplicates on client side first (excluding current)
      const existing = businessTypes.find(bt => 
        bt.name.toLowerCase().trim() === businessTypeData.name.toLowerCase().trim() && 
        bt.id !== id
      );
      
      if (existing) {
        return { success: false, error: 'A business type with this name already exists' };
      }

      await http.put(`/business-types/${id}`, businessTypeData);
      await fetchBusinessTypes();
      return { success: true, message: 'Business type updated successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteBusinessType = async (id) => {
    // Confirmation is handled in the UI component
    setLoading(true);
    try {
      await http.delete(`/business-types/${id}`);
      await fetchBusinessTypes();
      return { success: true, message: 'Business type deleted successfully' };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessTypes();
  }, []);

  return {
    businessTypes,
    loading,
    fetchBusinessTypes,
    createBusinessType,
    updateBusinessType,
    deleteBusinessType
  };
};
