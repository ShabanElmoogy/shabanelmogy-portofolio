import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tags = await prisma.blogTag.findMany();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, slug } = req.body;
    const tag = await prisma.blogTag.create({
      data: { name, slug }
    });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

export default router;
