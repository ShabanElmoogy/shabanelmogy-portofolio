/* eslint-disable react/prop-types */
import { Avatar, Stack, Typography } from "@mui/material";
import getCategoryIcon from "@/features/projects/components/ProjectDetails/utils/categoryIcons";

const CategoryHeader = ({ currentCategory }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
      <Avatar
        sx={{
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          width: 40,
          height: 40,
        }}
      >
        {(() => { const Icon = getCategoryIcon(currentCategory); return <Icon />; })()}
      </Avatar>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 0,
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {currentCategory}
      </Typography>
    </Stack>
  );
};

export default CategoryHeader;
