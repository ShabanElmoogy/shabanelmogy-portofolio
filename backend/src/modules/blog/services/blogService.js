import slugify from 'slugify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const calculateReadingTime = (markdownContent) => {
  if (!markdownContent) return 0;
  // Simple word count, stripping basic markdown syntax
  const text = markdownContent.replace(/[#*`_]/g, '');
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200;
  return Math.ceil(words / wordsPerMinute);
};

export const generateUniqueSlug = async (title, existingBlogId = null) => {
  let baseSlug = slugify(title, { lower: true, strict: true });
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.blog.findFirst({
      where: {
        slug: uniqueSlug,
        ...(existingBlogId && { id: { not: existingBlogId } })
      }
    });

    if (!existing) {
      break;
    }
    
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};

// Also handles tracking old slugs for 301 redirects
export const handleSlugUpdate = async (blogId, oldSlug, newSlug) => {
  if (oldSlug !== newSlug) {
    await prisma.blogSlugHistory.create({
      data: {
        blogId,
        oldSlug
      }
    });
  }
};
