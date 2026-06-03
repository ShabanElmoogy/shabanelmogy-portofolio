import { useMemo, useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { API_URL as API_BASE } from "@/config";
import http from "@/api/httpClient";

const API_URL = `${API_BASE}/projects`;
const CATEGORIES_URL = `${API_BASE}/categories`;
const BUSINESS_TYPES_URL = `${API_BASE}/business-types`;
const TECHNOLOGIES_URL = `${API_BASE}/technologies`;

export const useProjectListing = (initialItemsPerPage = 6) => {
  // Filters
  const [selectedBusinessType, setSelectedBusinessType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTechnology, setSelectedTechnology] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(initialItemsPerPage);

  // Queries
  const { data: allProjects = [], isLoading: isLoadingProjects, error: projectsError } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await http.get(API_URL.replace(API_BASE, ""));
      return Array.isArray(data) ? data : [];
    }
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await http.get(CATEGORIES_URL.replace(API_BASE, ""));
      return Array.isArray(data) ? data : [];
    }
  });

  const { data: businessTypes = [] } = useQuery({
    queryKey: ['businessTypes'],
    queryFn: async () => {
      const data = await http.get(BUSINESS_TYPES_URL.replace(API_BASE, ""));
      return Array.isArray(data) ? data : [];
    }
  });

  const { data: technologies = [] } = useQuery({
    queryKey: ['technologies'],
    queryFn: async () => {
      const data = await http.get(TECHNOLOGIES_URL.replace(API_BASE, ""));
      return Array.isArray(data) ? data : [];
    }
  });

  // Client-side filtering
  const filteredProjects = useMemo(() => {
    let filtered = [...allProjects];

    if (selectedBusinessType !== "all") {
      filtered = filtered.filter(project => project.businessType?.name === selectedBusinessType);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(project => project.category?.name === selectedCategory);
    }

    if (selectedTechnology !== "all") {
      filtered = filtered.filter(project => project.technologies?.some(tech => tech.name === selectedTechnology));
    }

    return filtered;
  }, [allProjects, selectedBusinessType, selectedCategory, selectedTechnology]);

  const handleBusinessTypeFilter = (value) => {
    setSelectedBusinessType(value);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleTechnologyFilter = (value) => {
    setSelectedTechnology(value);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedBusinessType("all");
    setSelectedCategory("all");
    setSelectedTechnology("all");
    setCurrentPage(1);
  };

  // Derived pagination values (from filtered projects)
  const totalPages = useMemo(() => {
    return Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  }, [filteredProjects, itemsPerPage]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage, itemsPerPage]);

  const handlePageChange = (event, page) => setCurrentPage(page);

  return {
    // data
    projects: filteredProjects,
    categories,
    businessTypes,
    technologies,

    // flags
    loading: isLoadingProjects,
    error: projectsError ? projectsError.message : null,

    // filters state
    selectedBusinessType,
    selectedCategory,
    selectedTechnology,

    // filter handlers
    handleBusinessTypeFilter,
    handleCategoryFilter,
    handleTechnologyFilter,
    clearAllFilters,

    // pagination
    currentPage,
    itemsPerPage,
    totalPages,
    currentItems,
    handlePageChange,
  };
};

export default useProjectListing;
