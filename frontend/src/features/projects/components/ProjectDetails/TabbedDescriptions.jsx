/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Paper, Fade, Grid } from "@mui/material";
import EnhancedDescriptionSection from "@/features/projects/components/ProjectDetails/EnhancedDescriptionSection";
import CategoryTabsBar from "@/features/projects/components/ProjectDetails/components/CategoryTabsBar";
import CategoryHeader from "@/features/projects/components/ProjectDetails/components/CategoryHeader";
import ProjectDetailsCard from "@/features/projects/components/ProjectDetails/components/cards/ProjectDetailsCard";
import TechStackCard from "@/features/projects/components/ProjectDetails/components/cards/TechStackCard";
import ProjectActionsCard from "@/features/projects/components/ProjectDetails/components/cards/ProjectActionsCard";

const TabbedDescriptions = ({ descriptions, isDark, project }) => {
  const [activeTab, setActiveTab] = useState(0);

  const groupedDescriptions = descriptions.reduce((acc, desc) => {
    const category = desc.category || "Overview";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(desc);
    return acc;
  }, {});

  const baseCategories = Object.keys(groupedDescriptions);
  const categories = ["Main", ...baseCategories];
  const currentCategory = categories[activeTab] || "Overview";
  const currentDescriptions = groupedDescriptions[currentCategory] || [];

  if (categories.length === 0) {
    return (
      <EnhancedDescriptionSection
        description={{
          title: "About This Project",
          points: [
            "This is an innovative project showcasing modern web development practices and cutting-edge technologies.",
            "Built with attention to detail and user experience in mind.",
            "Demonstrates proficiency in full-stack development and modern design principles.",
          ],
        }}
        index={0}
        isDark={isDark}
      />
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        background: isDark
          ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
          : "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <CategoryTabsBar
        activeTab={activeTab}
        onChange={setActiveTab}
        categories={categories}
        groupedDescriptions={groupedDescriptions}
        isDark={isDark}
      />

      <Box sx={{ p: 3 }}>
        <Fade in={true} timeout={600} key={activeTab}>
          <Box>
            <CategoryHeader currentCategory={currentCategory} />

            {currentCategory.toLowerCase() === "main" ? (
              <Box>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <ProjectDetailsCard project={project} isDark={isDark} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TechStackCard project={project} isDark={isDark} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <ProjectActionsCard project={project} isDark={isDark} />
                  </Grid>
                </Grid>
              </Box>
            ) : (
              currentDescriptions.map((desc, idx) => (
                <EnhancedDescriptionSection
                  key={`${currentCategory}-${idx}`}
                  description={desc}
                  index={idx}
                  isDark={isDark}
                />
              ))
            )}
          </Box>
        </Fade>
      </Box>
    </Paper>
  );
};

export default TabbedDescriptions;
