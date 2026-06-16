import jwt from 'jsonwebtoken';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
});

export const loginAdmin = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (validatedData.username !== adminUsername || validatedData.password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { role: 'admin', username: adminUsername },
      process.env.JWT_SECRET || 'fallback-secret-key-do-not-use-in-prod',
      { expiresIn: '24h' }
    );

    res.json({ token, message: 'Logged in successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
