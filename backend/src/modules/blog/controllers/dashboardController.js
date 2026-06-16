import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalBlogs,
      publishedBlogs,
      totalViewsObj,
      totalSubscribers
    ] = await Promise.all([
      prisma.blog.count({ where: { isDeleted: false } }),
      prisma.blog.count({ where: { isDeleted: false, status: 'PUBLISHED' } }),
      prisma.blog.aggregate({
        where: { isDeleted: false },
        _sum: { viewsCount: true }
      }),
      prisma.newsletterSubscriber.count({ where: { isActive: true } })
    ]);

    res.json({
      totalBlogs,
      publishedBlogs,
      totalViews: totalViewsObj._sum.viewsCount || 0,
      totalSubscribers
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
