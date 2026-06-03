/* eslint-disable react/prop-types */
import {
  Box,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Category as CategoryIcon,
  FormatQuote as FormatQuoteIcon,
} from "@mui/icons-material";

/* Palette for tech chips */
const chipColors = [
  "#1976d2",
  "#9c27b0",
  "#2e7d32",
  "#0288d1",
  "#ed6c02",
  "#d32f2f",
  "#6d4c41",
  "#00897B",
  "#7B1FA2",
  "#C2185B",
];

const hexToRgba = (hex, alpha = 1) => {
  const c = hex.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
// Deterministic color mapping per technology name
const hashString = (str) => {
  let hash = 0;
  if (!str) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};
const colorForTech = (name) => {
  const idx = hashString(String(name).toLowerCase()) % chipColors.length;
  return chipColors[idx];
};

const getProjectDescription = (item) => {
  const fallback =
    "A modern web application built with cutting-edge technologies.";
  if (
    !item ||
    !Array.isArray(item.descriptions) ||
    item.descriptions.length === 0
  )
    return fallback;
  // Prefer the 'Overview' category if present; otherwise fallback to the first section
  const overviewDesc =
    item.descriptions.find(
      (d) => String(d.category || "").toLowerCase() === "overview"
    ) || item.descriptions[0];
  if (!overviewDesc || !Array.isArray(overviewDesc.points)) return fallback;
  // Pick the first non-empty bullet and clean common bullet prefixes
  const firstPoint = overviewDesc.points.find((p) => p && String(p).trim());
  if (!firstPoint) return fallback;
  const cleaned = String(firstPoint)
    .replace(/^[\s•*-\u2022()0-9.]+/, "")
    .trim();
  return cleaned || fallback;
};

const ProjectCardContent = ({ item }) => {
  return (
    <CardContent
      sx={{
        flexGrow: 1,
        px: 3,
        pt: 3,
        pb: 1,
        display: "flex",
        flexDirection: "column",
              }}
    >
      <Tooltip
        title={item.title || "Untitled Project"}
        placement="top"
        arrow
        disableInteractive
      >
        <Typography
          variant="h6"
          component="h4"
          sx={{
            fontWeight: 700,
            lineHeight: 1.3,
            fontSize: { xs: "1rem", sm: "1.05rem", md: "1.1rem" },
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            textOverflow: "ellipsis",
            minHeight: "calc(1.3em * 2)",
          }}
        >
          {item.title || "Untitled Project"}
        </Typography>
      </Tooltip>

      <Box
        sx={(theme) => ({
          mt : 2,
          mb: 2,
          px: 1.5,
          py: 1,
          borderLeft: `3px solid ${theme.palette.primary.main}`,
          borderRadius: 1,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.04)"
              : "rgba(0,0,0,0.03)",
        })}
      >
        <Stack direction="row" spacing={1.25} alignItems="flex-start">
          <FormatQuoteIcon
            sx={{ fontSize: 18, color: "text.secondary", mt: "2px" }}
          />
          <Tooltip
            title={getProjectDescription(item)}
            placement="top"
            arrow
            disableInteractive
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.55,
                height: "3em",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {getProjectDescription(item)}
            </Typography>
          </Tooltip>
        </Stack>
      </Box>

      {item.category && (
        <Box sx={{ mb: 2 }}>
          <Chip
            icon={<CategoryIcon sx={{ fontSize: 16 }} />}
            label={item.category.name}
            size="small"
            variant="outlined"
            sx={(theme) => ({
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.6,
              pl: 1,
              borderWidth: 1.5,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              backgroundColor: hexToRgba(theme.palette.primary.main, 0.06),
              "& .MuiChip-icon": { color: theme.palette.primary.main },
              transition: "all .2s ease",
              "&:hover": {
                backgroundColor: hexToRgba(theme.palette.primary.main, 0.12),
                transform: "translateY(-1px)",
              },
            })}
          />
        </Box>
      )}

      <Box sx={{ mt: "auto" }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {(() => {
            return item.technologies && item.technologies.length > 0
              ? item.technologies.slice(0, 3).map((tech, techIndex) => {
                  const bg = colorForTech(tech?.name || tech);
                  return (
                    <Chip
                      key={techIndex}
                      label={tech.name || tech}
                      size="small"
                      variant="filled"
                      sx={{
                        fontWeight: 700,
                        backgroundColor: hexToRgba(bg, 0.15),
                        color: bg,
                        border: `1px solid ${hexToRgba(bg, 0.3)}`,
                        "&:hover": { backgroundColor: hexToRgba(bg, 0.25) },
                      }}
                    />
                  );
                })
              : item.technology && (
                  // @ts-ignore
                  <Chip
                    label={item.technology}
                    size="small"
                    variant="filled"
                    sx={{
                      fontWeight: 700,
                      backgroundColor: hexToRgba(
                        colorForTech(item.technology),
                        0.15
                      ),
                      color: colorForTech(item.technology),
                      border: `1px solid ${hexToRgba(
                        colorForTech(item.technology),
                        0.3
                      )}`,
                      "&:hover": {
                        backgroundColor: hexToRgba(
                          colorForTech(item.technology),
                          0.25
                        ),
                      },
                    }}
                  />
                );
          })()}
          {item.technologies && item.technologies.length > 3 && (
            <Chip
              label={`+${item.technologies.length - 3} more`}
              size="small"
              variant="outlined"
              color="secondary"
            />
          )}
        </Stack>
      </Box>
    </CardContent>
  );
};

export default ProjectCardContent;
