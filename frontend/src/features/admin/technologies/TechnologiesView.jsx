/* eslint-disable react/prop-types */
import { useState } from "react";
import { DataGrid, GridActionsCellItem, GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import { Box, Typography, Paper } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import GridHeader from '@/features/admin/shared/GridHeader';
import TechnologyDialog from '@/features/admin/technologies/TechnologyDialog';
import DeleteConfirmDialog from '@/features/admin/shared/DeleteConfirmDialog';

const TechnologiesView = ({ 
  technologies, 
  loading, 
  onCreateTechnology, 
  onUpdateTechnology, 
  onDeleteTechnology 
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [technologyToDelete, setTechnologyToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDialogOpen = (technology = null) => {
    setEditingTechnology(technology);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingTechnology(null);
  };

  const handleDeleteClick = (technology) => {
    setTechnologyToDelete(technology);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTechnologyToDelete(null);
    setIsDeleting(false);
  };

  const handleDeleteConfirm = async () => {
    if (!technologyToDelete) return;
    setIsDeleting(true);
    try {
      await onDeleteTechnology(technologyToDelete.id);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setTechnologyToDelete(null);
    }
  };

  const handleSubmit = async (technologyData) => {
    if (editingTechnology) {
      return await onUpdateTechnology(editingTechnology.id, technologyData);
    } else {
      return await onCreateTechnology(technologyData);
    }
  };

  // Custom footer component
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography variant="body2" color="text.secondary">
            Total: {technologies.length} technology{technologies.length !== 1 ? 'ies' : 'y'}
          </Typography>
          <GridFooter />
        </Box>
      </GridFooterContainer>
    );
  };

  /** @type {import('@mui/x-data-grid').GridColDef[]} */
  const technologyColumns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 70
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      renderCell: (params) => {
        console.log('Rendering technology name cell:', params);
        return String(params.value || '');
      }
    },
    {
      field: 'actions',
      type: /** @type {'actions'} */ ('actions'),
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
        title="Technologies"
        onAdd={() => handleDialogOpen()}
        addButtonText="Add Technology"
        addTooltip="Add New Technology"
        icon={CodeIcon}
      />

      <Paper elevation={1} sx={{ height: 390, width: '100%' }}>
        <DataGrid
          rows={technologies}
          columns={technologyColumns}
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

      <TechnologyDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        editingTechnology={editingTechnology}
        loading={loading}
        technologies={technologies}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Technology?"
        itemName={technologyToDelete?.name}
        loading={isDeleting}
      />
    </Box>
  );
};

export default TechnologiesView;
