import express from 'express';
import { createBlog, updateBlog, deleteBlog, getAdminBlogs, generateBlogContent } from '../controllers/blogController.js';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { requireAdmin } from '../../../middleware/auth.js';

const router = express.Router();

// Apply JWT auth middleware to all admin routes
router.use(requireAdmin);

// Dashboard stats
router.get('/dashboard', getDashboardStats);

// AI Generation
router.post('/generate', generateBlogContent);

// CRUD
router.get('/', getAdminBlogs);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
