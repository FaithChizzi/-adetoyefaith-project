import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data/users'; // Shared users array
import { User } from '../models/User';

const router = express.Router();

// 🔒 LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });

  res.json({ token, role: user.role });
});

// 📝 SIGN-UP
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required' });
  }

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    role,
  };

  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });

  res.status(201).json({ token, role: newUser.role });
});

export default router;

// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// const users: any[] = [
//   {
//     id: '1',
//     email: 'mentee@example.com',
//     password: bcrypt.hashSync('password123', 10),
//     role: 'mentee',
//   },
//   {
//     id: '2',
//     email: 'mentor@example.com',
//     password: bcrypt.hashSync('password456', 10),
//     role: 'mentor',
//   },
// ];

// // 🔒 LOGIN
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find(u => u.email === email);

//   if (!user) return res.status(404).json({ error: 'User not found' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

//   const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', {
//     expiresIn: '1h',
//   });

//   res.json({ token, role: user.role });
// });

// // 📝 SIGN-UP
// router.post('/register', (req, res) => {
//   const { email, password, role } = req.body;

//   if (!email || !password || !role) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   const existing = users.find(u => u.email === email);
//   if (existing) {
//     return res.status(409).json({ error: 'User already exists' });
//   }

//   const newUser = {
//     id: Date.now().toString(),
//     email,
//     password: bcrypt.hashSync(password, 10),
//     role,
//   };

//   users.push(newUser);
//   res.status(201).json({ message: 'User created successfully', user: { email, role } });
// });

// export default router;

// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// // ✅ In-memory user list
// const users = [
//   {
//     id: '1',
//     email: 'mentee@example.com',
//     password: bcrypt.hashSync('password123', 10),
//     role: 'mentee',
//   },
//   {
//     id: '2',
//     email: 'mentor@example.com',
//     password: bcrypt.hashSync('password456', 10),
//     role: 'mentor',
//   },
// ];

// // ✅ POST /api/login
// router.post('/login', async (req, res) => {
//   console.log('🟢 POST /api/login hit');

//   const { email, password } = req.body;

//   if (!email || !password) {
//     console.warn('⚠️ Missing email or password');
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   const user = users.find(u => u.email === email);
//   if (!user) {
//     console.warn(`❌ User not found: ${email}`);
//     return res.status(404).json({ error: 'User not found' });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     console.warn('❌ Incorrect password');
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', {
//     expiresIn: '1h',
//   });

//   console.log(`✅ Login successful for ${email} as ${user.role}`);
//   res.json({ token, role: user.role });
// });

// // ✅ POST /api/register
// router.post('/register', async (req, res) => {
//   console.log('🟢 POST /api/register hit');

//   const { email, password, role } = req.body;

//   if (!email || !password || !role) {
//     return res.status(400).json({ error: 'Email, password, and role are required' });
//   }

//   const existingUser = users.find(u => u.email === email);
//   if (existingUser) {
//     return res.status(409).json({ error: 'Email already in use' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = {
//     id: (users.length + 1).toString(),
//     email,
//     password: hashedPassword,
//     role,
//   };

//   users.push(newUser);

//   const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET || 'secret', {
//     expiresIn: '1h',
//   });

//   console.log(`✅ Registered new ${role}: ${email}`);
//   res.status(201).json({ token, role: newUser.role });
// });

// export default router;


// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// // ✅ In-memory user list
// const users = [
//   {
//     id: '1',
//     email: 'mentee@example.com',
//     password: bcrypt.hashSync('password123', 10),
//     role: 'mentee',
//   },
//   {
//     id: '2',
//     email: 'mentor@example.com',
//     password: bcrypt.hashSync('password456', 10),
//     role: 'mentor',
//   },
// ];

// // ✅ POST /api/login
// router.post('/login', async (req, res) => {
//   console.log('🟢 POST /api/login hit');

//   const { email, password } = req.body;

//   // Check for missing fields
//   if (!email || !password) {
//     console.warn('⚠️ Missing email or password');
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   const user = users.find(u => u.email === email);
//   if (!user) {
//     console.warn(`❌ User not found: ${email}`);
//     return res.status(404).json({ error: 'User not found' });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     console.warn('❌ Incorrect password');
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', {
//     expiresIn: '1h',
//   });

//   console.log(`✅ Login successful for ${email} as ${user.role}`);
//   res.json({ token, role: user.role });
// });

// export default router;
