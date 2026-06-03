/* eslint-disable react/prop-types */
import { Box, Chip, Stack, Typography } from "@mui/material";

const TechStackSection = ({ techStacks }) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary", fontSize: "1.1rem" }}>
          Tech Stack
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {techStacks.map((stack, index) => (
          <Box key={index}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: "1rem" }}>{stack.icon}</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.85rem" }}>
                {stack.category}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
              {stack.technologies.map((tech, techIndex) => (
                <Chip
                  key={techIndex}
                  label={tech}
                  size="small"
                  color={stack.color}
                  sx={{ fontSize: "0.7rem", fontWeight: 500, height: 24, "&:hover": { transform: "scale(1.05)" } }}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TechStackSection;
