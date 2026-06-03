/* eslint-disable react/prop-types */
import { Box, Stack, Typography, Button, Chip } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { motion } from "framer-motion";
import GlassPaper from "@/components/ui/GlassPaper";

const EmptyProjectsState = ({
  isDark,
  selectedBusinessType = "all",
  selectedCategory = "all",
  selectedTechnology = "all",
  onClearAll,
}) => {
  const activeFilters = [
    selectedBusinessType !== "all" && {
      label: selectedBusinessType,
      color: "info",
    },
    selectedCategory !== "all" && { label: selectedCategory, color: "primary" },
    selectedTechnology !== "all" && {
      label: selectedTechnology,
      color: "secondary",
    },
  ].filter(Boolean);

  return (
    <GlassPaper
      fullHeight={false}
      sx={{
        textAlign: "center",
        py: { xs: 3 },
        px: { xs: 3 },
        background: isDark
          ? "radial-gradient(1000px 400px at 50% -10%, rgba(33,150,243,0.12), rgba(255,255,255,0.03) 60%)"
          : "radial-gradient(1000px 400px at 50% -10%, rgba(33,150,243,0.12), rgba(255,255,255,0.9) 60%)",
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          sx={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: isDark
              ? "linear-gradient(135deg, rgba(33,150,243,0.2), rgba(33,150,243,0.05))"
              : "linear-gradient(135deg, rgba(33,150,243,0.25), rgba(33,150,243,0.08))",
            boxShadow: isDark
              ? "inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(0,0,0,0.25)"
              : "inset 0 0 0 1px rgba(33,150,243,0.15), 0 10px 30px rgba(33,150,243,0.15)",
          }}
        >
          <SearchOffIcon color="primary" sx={{ fontSize: 44 }} />
        </Box>

        <Stack spacing={1} alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            No projects match your filters
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth={560}>
            Try adjusting your filters or clear them to see all projects.
          </Typography>
        </Stack>

        {activeFilters.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            justifyContent="center"
          >
            {activeFilters.map((f, idx) => (
              <Chip
                key={idx}
                label={f.label}
                color={f.color}
                variant="outlined"
              />
            ))}
          </Stack>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Button variant="contained" color="primary" onClick={onClearAll}>
            Clear filters
          </Button>
          <Button variant="outlined" color="primary" onClick={onClearAll}>
            View all projects
          </Button>
        </Stack>
      </Stack>
    </GlassPaper>
  );
};

export default EmptyProjectsState;
