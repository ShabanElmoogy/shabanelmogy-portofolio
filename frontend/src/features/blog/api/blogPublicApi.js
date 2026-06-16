import http from '@/api/httpClient';

export const fetchPublicBlogs = async ({ page = 1, pageSize = 10, category = '', tag = '', search = '' }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  if (category) params.append('category', category);
  if (tag) params.append('tag', tag);
  if (search) params.append('search', search);

  return await http.get(`/v1/blogs?${params.toString()}`);
};

export const fetchBlogBySlug = async (slug) => {
  return await http.get(`/v1/blogs/${slug}`);
};
