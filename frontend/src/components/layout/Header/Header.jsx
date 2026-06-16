import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, useMediaQuery } from "@mui/material";
import MobileMenuButton from "@/components/layout/Header/components/MobileMenuButton";
import HeaderLeftInfo from "@/components/layout/Header/components/HeaderLeftInfo";
import CenterNav from "@/components/layout/Header/components/CenterNav";
import ThemeToggleButton from "@/components/layout/Header/components/ThemeToggleButton";
import HeaderMobileDrawer from "@/components/layout/Header/components/HeaderMobileDrawer";
import { useTheme } from "@/providers/ThemeContext";

const NAVIGATION_ITEMS = Object.freeze([
  { label: "About", sectionId: "up" },
  { label: "Services", sectionId: "services" },
  { label: "Featured", sectionId: "featured-projects" },
  { label: "Projects", sectionId: "projects" },
  { label: "Contact", sectionId: "contact" },
]);

const TECH_STACK = Object.freeze([
  "React",
  "Node.js",
  "C#",
  "ASP.NET",
  "JavaScript",
  "SQL Server",
  "MongoDB",
  "Blazor",
]);

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width:1375px)");
  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  // Cycle through tech stack
  useEffect(() => {
    const techTimer = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % TECH_STACK.length);
    }, 2500);

    return () => clearInterval(techTimer);
  }, []);

  // Detect scroll to toggle elevation and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation
  const handleNavigation = useCallback((item) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.sectionId) {
      if (window.location.pathname !== '/') {
        // If we are not on the home page, navigate to home with hash
        navigate(`/#${item.sectionId}`);
      } else {
        // We are already on the home page, just scroll smoothly
        const element = document.getElementById(item.sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }
    setShowModal(false);
  }, [navigate]);

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={isScrolled ? 3 : 0}
        sx={{
          top: 12,
          backgroundColor:
            theme === "dark" ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          mt: 2,
          px: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          transition:
            "box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
          zIndex: (t) => t.zIndex.appBar,
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", alignItems: "center", gap: 2 }}
        >
          {/* Mobile Menu Button */}
          {isMobile && <MobileMenuButton onOpen={() => setShowModal(true)} />}

          {/* Left Section - Clean Dynamic Content */}
          {!isMobile && (
            <HeaderLeftInfo
              currentTime={currentTime}
              formatTime={formatTime}
              techStack={TECH_STACK}
              currentTechIndex={currentTechIndex}
            />
          )}

          {/* Center - Desktop Navigation */}
          {!isMobile && (
            <CenterNav
              navigationItems={NAVIGATION_ITEMS}
              onNavigate={handleNavigation}
            />
          )}

          {/* Right - Theme Toggle */}
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <HeaderMobileDrawer
        open={showModal}
        onClose={() => setShowModal(false)}
        currentTime={currentTime}
        formatTime={formatTime}
        techStack={TECH_STACK}
        currentTechIndex={currentTechIndex}
        navigationItems={NAVIGATION_ITEMS}
        onNavigate={handleNavigation}
      />
    </>
  );
};

export default Header;
