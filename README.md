# Modern Portfolio Architecture

A full-stack, feature-rich developer portfolio designed for extreme performance, clean architecture, and seamless content management.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Express](https://img.shields.io/badge/Express-5-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-6-darkblue)

---

## 🏗️ Project Architecture

This application is separated into a decoupled client-server architecture.

### 🎨 Frontend (Client)
The frontend is a blazingly fast React Single Page Application (SPA) built with Vite. It has been strictly refactored using the **Feature-Sliced Design** pattern to ensure infinite scalability and maintainability.

#### Core Technologies:
- **Framework**: React 18 & Vite
- **UI & Styling**: Material-UI (MUI v5) & Framer Motion for micro-animations
- **State Management**: TanStack Query (React Query) for automatic server-state caching
- **Routing**: React Router DOM with lazy-loaded chunks
- **SEO**: React Helmet Async for dynamic metadata injection
- **Forms**: Formspree API for secure, backend-less contact forms

#### Key Frontend Features:
- **Lazy Loading**: The heavy Admin Dashboard (~400KB) is strictly isolated and dynamically imported using `React.lazy`. Regular visitors never download admin code, keeping the initial page load lightning fast.
- **Custom Hook Pattern**: All complex business logic (data fetching, state, form handling) is isolated into pure custom hooks (e.g., `useAdminPage`, `useAdminLogin`, `useContactForm`), ensuring that the UI components remain completely stateless and readable.
- **Feature Directory Structure**: Code is grouped by business domain (`features/admin`, `features/projects`, `features/contact`) rather than by file type.
- **Dark/Light Mode**: Full theme customization context via MUI.

### ⚙️ Backend (Server)
The backend is a lightweight, robust REST API designed to act as a Content Management System (CMS) for the frontend.

#### Core Technologies:
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database ORM**: Prisma Client
- **Security**: CORS integration
- **File Uploads**: Multer integration for handling media

#### Key Backend Features:
- **Dynamic Content Delivery**: Serves Projects, Categories, Business Types, and Technologies to the frontend dynamically.
- **Relational Database**: Uses Prisma to map relationships between projects, the technologies they use, and their overarching categories.
- **Admin Endpoints**: Secure routes to allow the frontend CMS to create, update, and delete portfolio data on the fly.
- **Media Management**: Processes image/file uploads through Multer for seamless portfolio additions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Local Setup

**1. Clone the repository**
```bash
git clone https://github.com/shabanelmogy/my-portofolio.git
cd my-portofolio
```

**2. Setup the Backend**
```bash
cd backend
npm install
# Set up your .env variables here for database connections
npx prisma generate
npx prisma db push # Or migrate
npm run dev
```

**3. Setup the Frontend**
```bash
cd frontend
npm install
npm run dev
```

Your frontend will be available at `http://localhost:5173` and connected to your running Express API!

---

## 🧠 Design Philosophy
This project rejects the "spaghetti code" standard of most portfolios. It is designed to demonstrate professional, enterprise-grade React architecture. By keeping UI pure, leveraging React Query for cache management, and separating concerns strictly by features, this codebase is built to scale and pivot effortlessly.
