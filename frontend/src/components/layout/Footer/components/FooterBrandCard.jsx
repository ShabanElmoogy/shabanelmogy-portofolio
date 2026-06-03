import { Typography } from "@mui/material";
import GlassPaper from "@/components/ui/GlassPaper";

const FooterBrandCard = () => {

  return (
      <GlassPaper elevation={0}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.2rem'
          }}
        >
          Portfolio
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '0.85rem', lineHeight: 1.5 }}
        >
          Creating innovative solutions through modern web technologies and clean design.
        </Typography>
      </GlassPaper>
  );
};

export default FooterBrandCard;
