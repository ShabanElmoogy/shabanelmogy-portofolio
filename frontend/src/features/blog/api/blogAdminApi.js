import http from '@/api/httpClient';

export const fetchAdminBlogs = async ({ page = 1, pageSize = 10, search = '', status = '' }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  if (search) params.append('search', search);
  if (status) params.append('status', status);

  return await http.get(`/v1/admin/blogs?${params.toString()}`);
};

export const fetchDashboardStats = async () => {
  return await http.get('/v1/admin/blogs/dashboard');
};

export const generateBlogContent = async (prompt) => {
  return await http.post('/v1/admin/blogs/generate', { prompt });
};

export const createBlog = async (data) => {
  return await http.post('/v1/admin/blogs', data);
};

export const updateBlog = async ({ id, data }) => {
  return await http.put(`/v1/admin/blogs/${id}`, data);
};

export const deleteBlog = async (id) => {
  return await http.delete(`/v1/admin/blogs/${id}`);
};

export const fetchBlogCategories = async () => {
  return await http.get('/v1/blog-categories');
};

export const createBlogCategory = async (data) => {
  return await http.post('/v1/blog-categories', data);
};

export const fetchBlogTags = async () => {
  return await http.get('/v1/blog-tags');
};

export const createBlogTag = async (data) => {
  return await http.post('/v1/blog-tags', data);
};
