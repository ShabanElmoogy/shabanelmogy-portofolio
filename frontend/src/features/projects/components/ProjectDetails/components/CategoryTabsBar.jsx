/* eslint-disable react/prop-types */
import { Box, Tabs, Tab, Stack, Chip } from "@mui/material";
import getCategoryIcon from "@/features/projects/components/ProjectDetails/utils/categoryIcons";

const CategoryTabsBar = ({ activeTab, onChange, categories, groupedDescriptions, isDark }) => {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        background: isDark
          ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
          : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      }}
   >
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => onChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTab-root": {
            minHeight: 64,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
          },
        }}
      >
        {categories.map((category) => (
          <Tab
            key={category}
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                {(() => { const Icon = getCategoryIcon(category); return <Icon />; })()}
                <span>{category}</span>
                {category.toLowerCase() !== "main" && (
                  <Chip
                    label={groupedDescriptions[category]?.length || 0}
                    size="small"
                    color="primary"
                    sx={{ minWidth: 24, height: 20, fontSize: "0.75rem" }}
                  />
                )}
              </Stack>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryTabsBar;
