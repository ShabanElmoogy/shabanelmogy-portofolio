/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridFooterContainer,
  GridFooter,
} from "@mui/x-data-grid";
import { Box, Chip, Paper, Typography, Stack, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GridHeader from "@/features/admin/shared/GridHeader";
import ProjectDialog from "@/features/admin/projects/ProjectDialog";
import DeleteConfirmDialog from "@/features/admin/shared/DeleteConfirmDialog";

const ProjectsView = ({
  projects,
  categories,
  businessTypes,
  technologies,
  loading,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
  onRefreshProjects,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Lightweight hash to distribute techs across theme colors
  const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const handleDialogOpen = (project = null) => {
    setEditingProject(project);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditingProject(null);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
    setIsDeleting(false);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      const result = await onDeleteProject(projectToDelete.id);
      if (result && result.success) {
        // Refresh the project list
        if (onRefreshProjects) {
          await onRefreshProjects();
        }
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleSubmit = async (data) => {
    // Check if data is already a saved project (has id) or form data
    if (data.id) {
      // This is already a saved project from ProjectDialog
      // Refresh the project list to show the updated data
      if (onRefreshProjects) {
        await onRefreshProjects();
      }
      return { success: true };
    } else {
      // This is form data, make API call
      if (editingProject) {
        return await onUpdateProject(editingProject.id, data);
      } else {
        return await onCreateProject(data);
      }
    }
  };

  // Custom footer component
  const CustomFooter = () => {
    return (
      <GridFooterContainer>
        <Box
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total: {projects.length} project{projects.length !== 1 ? "s" : ""}
          </Typography>
          <GridFooter />
        </Box>
      </GridFooterContainer>
    );
  };

  const projectColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      type: "number",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      type: "string",
    },
    {
      field: "businessType",
      headerName: "Business Type",
      flex: 1,
      type: "string",
      renderCell: (params) => {
        return params.row.businessType?.name || "No Business Type";
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      flex: 1,
      type: "string",
      renderCell: (params) => {
        return params.row.category?.name || "No Category";
      },
    },
    {
      field: "featured",
      headerName: "Featured",
      width: 100,
      type: "boolean",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {params.row.featured ? (
            <StarIcon sx={{ color: "#ffa000", fontSize: 20 }} />
          ) : (
            <StarOutlineIcon sx={{ color: "#ccc", fontSize: 20 }} />
          )}
        </Box>
      ),
    },
    {
      field: "technologies",
      headerName: "Technologies",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const techs = params.row.technologies || [];
        const maxVisible = 2;
        const visible = techs.slice(0, maxVisible);
        const remaining = techs.length - visible.length;
        const count = techs.length;
        const fontSize = count >= 2 ? '0.5rem' : count >= 4 ? '0.7rem' : '0.75rem';
        const chipHeight = count >= 6 ? 20 : count >= 4 ? 22 : 24;
        const labelMaxWidth = count >= 6 ? 90 : count >= 4 ? 110 : 120;

        if (techs.length === 0) {
          return (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              No technologies
            </Typography>
          );
        }

        return (
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflow: "hidden",
              gap: 0.5,
              alignItems: "center",
              justifyContent: "flex-start",
              height: "100%",
              py: 1,
            }}
          >
            {visible.map((tech) => {
              const idx = hashString(tech.name) % 5;
              return (
                <Chip
                  key={tech.id}
                  label={tech.name}
                  title={tech.name}
                  size="small"
                  sx={(theme) => {
                    const palette = [
                      theme.palette.primary.main,
                      theme.palette.secondary.main,
                      theme.palette.success.main,
                      theme.palette.warning.main,
                      theme.palette.info.main,
                    ];
                    const color = palette[idx];
                    return {
                      fontSize: fontSize,
                      fontWeight: 600,
                      bgcolor: alpha(color, 0.12),
                      color,
                      border: `1px solid ${alpha(color, 0.24)}`,
                      "&:hover": { bgcolor: alpha(color, 0.18) },
                      borderRadius: "12px",
                      height: chipHeight,
                      "& .MuiChip-label": {
                        maxWidth: labelMaxWidth,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    };
                  }}
                />
              );
            })}

            {remaining > 0 && (
              <Tooltip
                title={techs
                  .slice(maxVisible)
                  .map((t) => t.name)
                  .join(", ")}
              >
                <Chip
                  label={`+${remaining} more`}
                  size="small"
                  sx={(theme) => ({
                    fontSize: fontSize,
                    fontWeight: 600,
                    bgcolor: alpha(theme.palette.text.primary, 0.06),
                    color: theme.palette.text.secondary,
                    border: `1px solid ${alpha(
                      theme.palette.text.primary,
                      0.12
                    )}`,
                    "&:hover": {
                      bgcolor: alpha(theme.palette.text.primary, 0.1),
                    },
                    borderRadius: "12px",
                    height: chipHeight,
                  })}
                />
              </Tooltip>
            )}
          </Box>
        );
      },
    },
    {
      field: "imgPath",
      headerName: "Image",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <img
          src={params.value}
          alt=""
          style={{
            width: 80,
            height: 50,
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
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
        />,
      ],
    },
  ];

  return (
    <Box>
      <GridHeader
        title="Projects"
        onAdd={() => handleDialogOpen()}
        addButtonText="Add Project"
        addTooltip="Add New Project"
        icon={DashboardIcon}
      />

      <Paper elevation={1} sx={{ height: 390, width: "100%" }}>
        <DataGrid
          rows={projects}
          // @ts-ignore
          columns={projectColumns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5]}
          loading={loading}
          disableRowSelectionOnClick
          slots={{
            footer: CustomFooter,
          }}
        />
      </Paper>

      <ProjectDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSave={handleSubmit}
        project={editingProject}
        // @ts-ignore
        categories={categories}
        businessTypes={businessTypes}
        technologies={technologies}
        loading={loading}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Project?"
        itemName={projectToDelete?.title}
        loading={isDeleting}
        previewContent={
          projectToDelete ? (
            <>
              <Box
                component="img"
                src={projectToDelete.imgPath}
                alt={projectToDelete.title}
                sx={{
                  width: 40,
                  height: 28,
                  objectFit: "cover",
                  borderRadius: 1,
                  opacity: 0.7,
                }}
              />
              <Stack spacing={0.5} alignItems="flex-start">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {projectToDelete.title}
                </Typography>
                <Stack direction="row" spacing={0.5}>
                  {projectToDelete.featured && (
                    <Chip
                      icon={<StarIcon />}
                      label="Featured"
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.7rem",
                        bgcolor: "#ffa000",
                        color: "white",
                        "& .MuiChip-icon": {
                          color: "white",
                          fontSize: "0.8rem",
                        },
                      }}
                    />
                  )}
                </Stack>
              </Stack>
            </>
          ) : null
        }
      />
    </Box>
  );
};

export default ProjectsView;
