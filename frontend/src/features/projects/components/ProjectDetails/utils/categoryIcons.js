import {
  Home as HomeIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Build as BuildIcon,
  Code as CodeIcon,
  Palette as PaletteIcon,
  Speed as SpeedIcon,
  Tab as TabIcon,
} from "@mui/icons-material";

// Returns the icon component (not JSX) for a given category.
// Consumers should render it as: const Icon = getCategoryIcon(category); <Icon />
export const getCategoryIcon = (category) => {
  const categoryLower = String(category || "").toLowerCase();
  if (categoryLower === "main") return HomeIcon;
  if (categoryLower.includes("overview")) return DescriptionIcon;
  if (categoryLower.includes("feature")) return CheckCircleIcon;
  if (categoryLower.includes("technical")) return CodeIcon;
  if (categoryLower.includes("implementation")) return BuildIcon;
  if (categoryLower.includes("design")) return PaletteIcon;
  if (categoryLower.includes("performance")) return SpeedIcon;
  return TabIcon;
};

export default getCategoryIcon;
