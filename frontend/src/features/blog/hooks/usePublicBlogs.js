import { useQuery } from '@tanstack/react-query';
import { fetchPublicBlogs, fetchBlogBySlug } from '../api/blogPublicApi';
import { fetchBlogCategories } from '../api/blogAdminApi';

export const usePublicBlogs = (params) => {
  const query = useQuery({
    queryKey: ['publicBlogs', params],
    queryFn: () => fetchPublicBlogs(params),
    keepPreviousData: true,
  });

  return query;
};

export const useBlogDetail = (slug) => {
  const query = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => fetchBlogBySlug(slug),
    enabled: !!slug,
    retry: false // Don't retry on 404
  });

  return query;
};

export const usePublicCategories = () => {
  return useQuery({
    queryKey: ['blogCategories'],
    queryFn: fetchBlogCategories
  });
};
