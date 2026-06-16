import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdminBlogs, createBlog, updateBlog, deleteBlog } from '../api/blogAdminApi';

export const useAdminBlogs = (params) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['adminBlogs', params],
    queryFn: () => fetchAdminBlogs(params),
    keepPreviousData: true,
  });

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogs'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogs'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogs'] });
    },
  });

  return {
    query,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
