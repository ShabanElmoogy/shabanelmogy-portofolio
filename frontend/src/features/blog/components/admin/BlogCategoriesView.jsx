import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBlogCategories, createBlogCategory } from '../../api/blogAdminApi';

const BlogCategoriesView = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: fetchBlogCategories
  });

  const createMutation = useMutation({
    mutationFn: createBlogCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogCategories'] });
      setName('');
      setSlug('');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate({ name, slug });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'slug', headerName: 'Slug', flex: 1 },
    { 
      field: 'createdAt', 
      headerName: 'Created At', 
      width: 200,
      valueFormatter: (value) => new Date(value).toLocaleDateString()
    }
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Manage Blog Categories</Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Add New Category</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth label="Category Name" value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                }}
                required sx={{ mb: 2 }}
              />
              <TextField
                fullWidth label="Slug" value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required sx={{ mb: 3 }}
              />
              <Button type="submit" variant="contained" fullWidth disabled={createMutation.isPending}>
                Create Category
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={categories}
              columns={columns}
              loading={isLoading}
              pageSizeOptions={[10, 25, 50]}
              disableRowSelectionOnClick
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogCategoriesView;
