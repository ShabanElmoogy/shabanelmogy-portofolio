import { Box, Container, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import WebIcon from "@mui/icons-material/Web";
import StorageIcon from "@mui/icons-material/Storage";
import ApiIcon from "@mui/icons-material/Api";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import TransformIcon from "@mui/icons-material/Transform";
import ServiceCard from "./ServiceCard";

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const servicesData = [
  {
    title: "Full-Stack Web Development",
    description: "Building responsive, highly interactive web applications using React, Node.js, and ASP.NET Core with a focus on user experience.",
    icon: WebIcon,
  },
  {
    title: "API Design & Integration",
    description: "Developing robust and scalable RESTful APIs with Express and C#, ensuring seamless communication between frontends and backend systems.",
    icon: ApiIcon,
  },
  {
    title: "Database Architecture",
    description: "Designing efficient database schemas using MySQL, SQL Server, and Prisma ORM for optimized queries and data integrity.",
    icon: StorageIcon,
  },
  {
    title: "AI Integration",
    description: "Integrating modern GenAI capabilities and LLMs into applications to provide smart, automated, and innovative features.",
    icon: AutoAwesomeIcon,
  },
  {
    title: "Mobile App Development",
    description: "Developing cross-platform mobile applications for iOS and Android using React Native, delivering native-like performance.",
    icon: PhoneIphoneIcon,
  },
  {
    title: "Desktop Applications",
    description: "Building robust desktop applications using .NET Windows Forms, catering to enterprise solutions and business operations.",
    icon: DesktopWindowsIcon,
  },
  {
    title: "Legacy System Modernization",
    description: "Upgrading and migrating outdated software systems to modern, scalable web or mobile platforms to improve efficiency.",
    icon: TransformIcon,
  }
];

const Services = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Services I Offer
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "600px", mx: "auto" }}>
              Leveraging my expertise in modern technologies to build scalable, high-performance, and visually appealing applications.
            </Typography>
          </motion.div>
        </Box>

        <Box sx={{ position: "relative", width: "100%", overflow: "hidden", py: 4 }}>
          {/* Fading Edges for smooth entry/exit */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: { xs: "50px", md: "150px" },
              zIndex: 2,
              background: (theme) =>
                `linear-gradient(to right, ${
                  theme.palette.mode === "dark" ? "rgb(24, 24, 27)" : "#ffffff"
                }, transparent)`,
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: { xs: "50px", md: "150px" },
              zIndex: 2,
              background: (theme) =>
                `linear-gradient(to left, ${
                  theme.palette.mode === "dark" ? "rgb(24, 24, 27)" : "#ffffff"
                }, transparent)`,
              pointerEvents: "none",
            }}
          />

          {/* Scrolling Track */}
          <Box
            sx={{
              display: "flex",
              width: "fit-content",
              gap: "32px",
              animation: `${scrollAnimation} 35s linear infinite`,
              "&:hover": {
                animationPlayState: "paused",
              },
            }}
          >
            {/* Duplicate the array to create a seamless infinite loop */}
            {[...servicesData, ...servicesData].map((service, index) => (
              <Box key={index} sx={{ width: { xs: "280px", sm: "340px" }, flexShrink: 0 }}>
                <ServiceCard {...service} index={0} />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
