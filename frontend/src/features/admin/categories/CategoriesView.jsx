/* eslint-disable react/prop-types */
import { useState } from "react";
import { DataGrid, GridActionsCellItem, GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import { Box, Typography, Paper } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import GridHeader from '@/features/admin/shared/GridHeader';
import CategoryDialog from '@/features/admin/categories/CategoryDialog';
import DeleteConfirmDialog from '@/features/admin/shared/DeleteConfirmDialog';

const CategoriesView = ({ 
  categories, 
  loading, 
  onCreateCategory, 
  onUpdateCategory, 
  onDeleteCategory 
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDialogOpen = (category = null) => {
    setEditingCategory(category);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingCategory(null);
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
    setIsDeleting(false);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);
    try {
      await onDeleteCategory(categoryToDelete.id);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleSubmit = async (categoryData) => {
    if (editingCategory) {
      return await onUpdateCategory(editingCategory.id, categoryData);
    } else {
      return await onCreateCategory(categoryData);
    }
  };

  // Custom footer component
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography variant="body2" color="text.secondary">
            Total: {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'}
          </Typography>
          <GridFooter />
        </Box>
      </GridFooterContainer>
    );
  };

  const categoryColumns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 70,
      type: 'number'
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      type: 'string',
      renderCell: (params) => {
        console.log('Rendering category name cell:', params);
        return String(params.value || '');
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      getActions: (params) => [
        <GridActionsCellItem 
          key={`edit-${params.id}`} 
          label="Edit" 
          showInMenu 
          onClick={() => handleDialogOpen(params.row)} 
        />,
        <GridActionsCellItem 
          key={`delete-${params.id}`} 
          label="Delete" 
          showInMenu 
          onClick={() => handleDeleteClick(params.row)} 
        />
      ]
    }
  ];

  return (
    <Box>
      <GridHeader
        title="Categories"
        onAdd={() => handleDialogOpen()}
        addButtonText="Add Category"
        addTooltip="Add New Category"
        icon={CategoryIcon}
      />

      <Paper elevation={1} sx={{ height: 380, width: '100%' }}>
        <DataGrid
          rows={categories}
          columns={categoryColumns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          slots={{
            footer: CustomFooter,
          }}
        />
      </Paper>

      <CategoryDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        editingCategory={editingCategory}
        loading={loading}
        categories={categories}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Category?"
        itemName={categoryToDelete?.name}
        loading={isDeleting}
      />
    </Box>
  );
};

export default CategoriesView;
