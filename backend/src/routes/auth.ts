import authRoutes from './routes/auth';
app.use('/api', authRoutes);
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data/users'; // simple array or JSON
import { User } from '../models/User';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).send('User not found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).send('Invalid credentials');

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret');
  res.json({ token, role: user.role });
});

// Admin-only: create users
router.post('/register', (req, res) => {
  const { email, password, role } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  const user: User = {
    id: Date.now().toString(),
    email,
    password: hashed,
    role,
  };
  users.push(user);
  res.status(201).json(user);
});

export default router;

