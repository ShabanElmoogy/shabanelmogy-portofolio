import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

export const contactInfo = [
  {
    icon: EmailIcon,
    label: "shaban.prog2021@gmail.com",
    href: "mailto:shaban.prog2021@gmail.com",
  },
  {
    icon: PhoneIcon,
    label: "+201033982989  +201284555561",
    href: "tel:+15551234567",
  },
  { icon: LocationIcon, label: "Port-Said, Egypt", href: "#" },
];

export const socialLinks = [
  {
    icon: LinkedInIcon,
    url: "https://www.linkedin.com/in/shaban-elmogy-42310731a",
    color: "#0077B5",
    label: "LinkedInn",
  },
  {
    icon: GitHubIcon,
    url: "https://github.com/ShabanElmoogy",
    color: "#333",
    label: "GitHub",
  },
  {
    imageSrc: "/qabilah.PNG",
    url: "https://qabilah.com/profile/shaban-elmogy-42310731a/posts",
    color: "#ffffff",
    label: "Qabilah",
  },
];

export const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume" },
];
