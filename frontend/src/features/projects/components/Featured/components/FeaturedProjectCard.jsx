/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Card, CardContent } from "@mui/material";
import { useTheme } from "@/providers/ThemeContext";
import FeaturedCardMedia from "@/features/projects/components/Featured/components/FeaturedCardMedia";
import FeaturedCardTitle from "@/features/projects/components/Featured/components/FeaturedCardTitle";
import FeaturedCardMetaChips from "@/features/projects/components/Featured/components/FeaturedCardMetaChips";
import FeaturedCardOverview from "@/features/projects/components/Featured/components/FeaturedCardOverview";
import FeaturedCardTechnologies from "@/features/projects/components/Featured/components/FeaturedCardTechnologies";
import FeaturedCardActions from "@/features/projects/components/Featured/components/FeaturedCardActions";

const FeaturedProjectCard = ({ project, index = 0 }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          backgroundColor: isDark
            ? "rgba(255,255,255,0.05)"
            : "background.paper",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "none",
          boxShadow: isDark
            ? "0 8px 32px rgba(0,0,0,0.3)"
            : "0 8px 32px rgba(0,0,0,0.1)",
          "&:hover": {
            transform: "translateY(-12px) scale(1.02)",
            boxShadow: isDark
              ? "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(33,150,243,0.2)"
              : "0 20px 40px rgba(0,0,0,0.15), 0 0 20px rgba(33,150,243,0.1)",
          },
          "&:hover .card-overlay": {
            opacity: 1,
          },
        }}
      >
        <FeaturedCardMedia project={project} />
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <FeaturedCardTitle title={project.title} />
          <FeaturedCardOverview project={project} />
          <FeaturedCardMetaChips project={project} />
          <FeaturedCardTechnologies project={project} />
        </CardContent>
        <FeaturedCardActions projectId={project.id} />
      </Card>
    </motion.div>
  );
};

export default FeaturedProjectCard;
