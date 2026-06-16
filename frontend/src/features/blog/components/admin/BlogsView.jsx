import { useState } from 'react';
import { Box, Button, Typography, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAdminBlogs } from '../../hooks/useAdminBlogs';
import BlogEditor from './BlogEditor.jsx';

const BlogsView = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  
  const { query, deleteMutation } = useAdminBlogs({
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  });
  
  const data = /** @type {any} */ (query.data);
  const items = data?.items || [];
  const totalItems = data?.totalItems || 0;

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setEditorOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params) => {
        const colors = {
          DRAFT: 'default',
          REVIEW: 'warning',
          PUBLISHED: 'success',
          ARCHIVED: 'error'
        };
        return <Chip label={params.value} color={colors[params.value] || 'default'} size="small" />;
      }
    },
    { 
      field: 'category', 
      headerName: 'Category', 
      width: 150,
      valueGetter: (params) => params?.name || 'Uncategorized' 
    },
    { field: 'views', headerName: 'Views', width: 100 },
    { 
      field: 'createdAt', 
      headerName: 'Created At', 
      width: 200,
      valueFormatter: (value) => new Date(value).toLocaleDateString()
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Manage Blogs</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingBlog(null);
            setEditorOpen(true);
          }}
        >
          Create Blog
        </Button>
      </Box>

      <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
        <DataGrid
          rows={items}
          columns={columns}
          rowCount={totalItems}
          loading={query.isLoading || query.isFetching}
          pageSizeOptions={[10, 25, 50]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog 
        open={editorOpen} 
        onClose={() => setEditorOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          {editorOpen && (
            <BlogEditor 
              blog={editingBlog} 
              onClose={() => setEditorOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BlogsView;
