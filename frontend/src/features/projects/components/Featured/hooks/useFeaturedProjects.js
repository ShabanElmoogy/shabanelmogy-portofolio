import { useEffect, useMemo, useState } from "react";
import { API_URL as API_BASE } from "@/config";
import http from "@/api/httpClient";

const FEATURED_PROJECTS_URL = `${API_BASE}/projects/featured`;

/**
 * Hook to fetch and group featured projects for carousel/list views.
 *
 * @param {Object} [options]
 * @param {boolean} [options.isMobile=false] - Whether to use mobile layout (affects items per slide)
 * @returns {{
 *   featuredProjects: any[],
 *   loading: boolean,
 *   itemsPerSlide: number,
 *   projectGroups: any[][],
 * }}
 */
export default function useFeaturedProjects(options) {
  const { isMobile = false } = options ?? {};
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchFeaturedProjects = async () => {
      setLoading(true);
      try {
        // http client in frontend already prefixes API base via proxy, so strip base from URL
        const data = await http.get(FEATURED_PROJECTS_URL.replace(API_BASE, ""));
        if (mounted) setFeaturedProjects(data);
      } catch (err) {
        console.error("Failed to fetch featured projects:", err);
        if (mounted) setFeaturedProjects([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchFeaturedProjects();
    return () => {
      mounted = false;
    };
  }, []);

  const itemsPerSlide = isMobile ? 1 : 2;

  const projectGroups = useMemo(() => {
    if (!Array.isArray(featuredProjects) || featuredProjects.length === 0) return [];
    const groups = [];
    for (let i = 0; i < featuredProjects.length; i += itemsPerSlide) {
      groups.push(featuredProjects.slice(i, i + itemsPerSlide));
    }
    return groups;
  }, [featuredProjects, itemsPerSlide]);

  return { featuredProjects, loading, itemsPerSlide, projectGroups };
}
