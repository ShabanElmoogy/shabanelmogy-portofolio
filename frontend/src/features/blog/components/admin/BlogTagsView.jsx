import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBlogTags, createBlogTag } from '../../api/blogAdminApi';

const BlogTagsView = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const { data: tags = [], isLoading } = useQuery({
    queryKey: ['blogTags'],
    queryFn: fetchBlogTags
  });

  const createMutation = useMutation({
    mutationFn: createBlogTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogTags'] });
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
      <Typography variant="h5" sx={{ mb: 3 }}>Manage Blog Tags</Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Add New Tag</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth label="Tag Name" value={name}
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
                Create Tag
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={tags}
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

export default BlogTagsView;
