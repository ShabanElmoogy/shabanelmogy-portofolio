import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address')
});

export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = subscribeSchema.parse(req.body);

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (existing) {
      if (!existing.isActive) {
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { isActive: true }
        });
        return res.json({ message: 'Resubscribed successfully' });
      }
      return res.status(400).json({ error: 'Email is already subscribed' });
    }

    await prisma.newsletterSubscriber.create({
      data: { email }
    });

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Newsletter subscribe error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
