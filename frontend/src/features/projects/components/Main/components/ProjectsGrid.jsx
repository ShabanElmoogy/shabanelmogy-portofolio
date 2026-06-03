/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import ProjectCard from "@/features/projects/components/Main/components/ProjectCard";

const ProjectsGrid = ({
  items,
  isDark,
  adminMode,
  onOpenUrl,
  onEdit,
  onDelete,
  onNavigate,
}) => (
  <AnimatePresence>
    <Grid container spacing={3}>
      {items.map((item, index) => (
        <Grid size={{ xs: 12, lg: 4 }} key={item.id}>
          <ProjectCard
            item={item}
            index={index}
            isDark={isDark}
            adminMode={adminMode}
            onOpenUrl={onOpenUrl}
            onEdit={onEdit}
            onDelete={onDelete}
            onNavigate={onNavigate}
          />
        </Grid>
      ))}
    </Grid>
  </AnimatePresence>
);

export default ProjectsGrid;
