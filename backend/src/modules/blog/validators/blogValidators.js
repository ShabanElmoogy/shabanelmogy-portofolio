import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(3).max(255),
  excerpt: z.string().min(10),
  content: z.string().min(10),
  coverImage: z.string().url().optional().nullable(),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  isFeatured: z.boolean().default(false),
  categoryId: z.number().int().positive(),
  tags: z.array(z.number().int().positive()).optional(),
  
  // SEO
  seoTitle: z.string().max(255).optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  seoKeywords: z.string().max(255).optional().nullable(),

  // Scheduling
  scheduledPublishAt: z.string().datetime().optional().nullable(),
});

export const updateBlogSchema = createBlogSchema.partial();
