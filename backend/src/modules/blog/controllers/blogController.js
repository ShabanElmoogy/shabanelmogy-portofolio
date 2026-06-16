import blogRepository from '../repositories/blogRepository.js';
import { generateUniqueSlug, calculateReadingTime, handleSlugUpdate } from '../services/blogService.js';
import { createBlogSchema, updateBlogSchema } from '../validators/blogValidators.js';

export const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    
    const { search, category, tag, isFeatured } = req.query;

    const { items, total } = await blogRepository.findAll({
      skip,
      take: pageSize,
      search,
      categorySlug: category,
      tagSlug: tag,
      status: 'PUBLISHED',
      isFeatured: isFeatured ? isFeatured === 'true' : undefined
    });

    res.json({
      items,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAdminBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    
    const { search, status } = req.query;

    // Admin sees all statuses unless filtered
    const { items, total } = await blogRepository.findAll({
      skip,
      take: pageSize,
      search,
      status: status || undefined, // undefined in repo means no status filter if handled correctly, but wait - repo defaults to 'PUBLISHED'. Let's check repo.
    });

    res.json({
      items,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching admin blogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // 1. Try to find the active blog
    let blog = await blogRepository.findBySlug(slug);

    if (blog) {
      return res.json(blog);
    }

    // 2. If not found, check if it's an old slug (SEO 301 Redirect)
    const oldSlugRecord = await blogRepository.findOldSlug(slug);
    if (oldSlugRecord && !oldSlugRecord.blog.isDeleted) {
      return res.status(301).json({ 
        redirect: true, 
        newSlug: oldSlugRecord.blog.slug 
      });
    }

    res.status(404).json({ error: 'Blog not found' });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const data = createBlogSchema.parse(req.body);
    
    const slug = await generateUniqueSlug(data.title);
    const readingTime = calculateReadingTime(data.content);
    
    // If status is PUBLISHED and no publishedAt is provided, set it now
    let publishedAt = data.status === 'PUBLISHED' ? new Date() : null;

    const newBlog = await blogRepository.create({
      ...data,
      slug,
      readingTime,
      publishedAt
    });

    res.status(201).json(newBlog);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Validation Error', details: error.errors });
    }
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = updateBlogSchema.parse(req.body);
    
    // Get existing to check slug history
    const existingBlog = await blogRepository.findById(id);
    
    let updatePayload = { ...data };

    if (data.title) {
      updatePayload.slug = await generateUniqueSlug(data.title, id);
    }

    if (data.content) {
      updatePayload.readingTime = calculateReadingTime(data.content);
    }

    if (data.status === 'PUBLISHED') {
      updatePayload.publishedAt = new Date();
    }

    const updatedBlog = await blogRepository.update(id, updatePayload);

    // If slug changed, record it for 301 redirects
    if (updatePayload.slug && existingBlog && existingBlog.slug !== updatePayload.slug) {
      await handleSlugUpdate(id, existingBlog.slug, updatePayload.slug);
    }

    res.json(updatedBlog);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Validation Error', details: error.errors });
    }
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await blogRepository.softDelete(id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

import { GoogleGenAI } from '@google/genai';

export const generateBlogContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in backend .env' });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `
      You are an expert technical blog writer.
      Generate a blog post based on the user's topic prompt.
      You must respond strictly with a valid JSON object matching this schema:
      {
        "title": "A catchy title",
        "excerpt": "A two-sentence summary for the blog card",
        "content": "The full blog content written in beautiful Markdown. Use markdown headings, lists, and code blocks."
      }
      Do not wrap the response in markdown blocks like \`\`\`json. Return raw JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      }
    });

    const data = JSON.parse(response.text);
    res.json(data);
  } catch (error) {
    console.error('Error generating blog via AI:', error);
    res.status(500).json({ error: 'Failed to generate blog content via AI' });
  }
};
