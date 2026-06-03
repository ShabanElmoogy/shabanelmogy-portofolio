/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import { motion } from "framer-motion";
import ProjectCardMedia from "@/features/projects/components/Main/components/project-card/ProjectCardMedia";
import ProjectCardContent from "@/features/projects/components/Main/components/project-card/ProjectCardContent";
import ProjectCardActions from "@/features/projects/components/Main/components/project-card/ProjectCardActions";

const ProjectCard = ({ item, index, isDark, adminMode, onOpenUrl, onEdit, onDelete, onNavigate }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
    >
      <Card
        sx={{
          height: 600,
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "background.paper",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "none",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: isDark
              ? "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(33,150,243,0.1)"
              : "0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(33,150,243,0.1)",
          },
          "&:hover .card-overlay": { opacity: 1 },
          "&:hover .admin-overlay": { opacity: adminMode ? 1 : 0 },
        }}
      >
        <ProjectCardMedia item={item} adminMode={adminMode} onOpenUrl={onOpenUrl} onEdit={onEdit} onDelete={onDelete} />
        <ProjectCardContent item={item} />
        <ProjectCardActions isDark={isDark} onNavigate={onNavigate} item={item} />
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
