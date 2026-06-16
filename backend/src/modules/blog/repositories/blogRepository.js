import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class BlogRepository {
  async findAll({ skip, take, search, categorySlug, tagSlug, status, isFeatured }) {
    const where = {
      isDeleted: false,
      ...(status && { status }),
      ...(isFeatured !== undefined && { isFeatured }),
      ...(categorySlug && { category: { slug: categorySlug } }),
      ...(tagSlug && { tags: { some: { tag: { slug: tagSlug } } } }),
    };

    if (search) {
      where.OR = [
        { title: { search } },
        { excerpt: { search } },
        { content: { search } }
      ];
    }

    const [items, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take,
        orderBy: { publishedAt: 'desc' },
        include: {
          category: true,
          tags: { include: { tag: true } }
        }
      }),
      prisma.blog.count({ where })
    ]);

    return { items, total };
  }

  async findBySlug(slug) {
    return prisma.blog.findFirst({
      where: { 
        slug,
        isDeleted: false
      },
      include: {
        category: true,
        tags: { include: { tag: true } }
      }
    });
  }

  async findById(id) {
    return prisma.blog.findUnique({
      where: { id },
      include: {
        category: true,
        tags: { include: { tag: true } }
      }
    });
  }
  
  async findOldSlug(slug) {
    return prisma.blogSlugHistory.findFirst({
      where: { oldSlug: slug },
      include: { blog: true }
    });
  }

  async create(data) {
    const { tags, ...blogData } = data;
    return prisma.blog.create({
      data: {
        ...blogData,
        ...(tags && {
          tags: {
            create: tags.map(tagId => ({ tag: { connect: { id: tagId } } }))
          }
        })
      },
      include: { category: true, tags: true }
    });
  }

  async update(id, data) {
    const { tags, ...blogData } = data;
    
    // If tags are provided, we replace existing tags
    let updateData = { ...blogData };
    if (tags) {
      updateData.tags = {
        deleteMany: {}, // Remove old relations
        create: tags.map(tagId => ({ tag: { connect: { id: tagId } } }))
      };
    }

    return prisma.blog.update({
      where: { id },
      data: updateData,
      include: { category: true, tags: true }
    });
  }

  async softDelete(id) {
    return prisma.blog.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() }
    });
  }
}

export default new BlogRepository();
