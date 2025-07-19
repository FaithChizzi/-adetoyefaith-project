import express from 'express';
import { users } from '../data/users';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = express.Router();

router.get('/users', authenticateJWT, authorizeRoles('admin'), (req, res) => {
  res.json(users);
});

router.post('/assign-mentor', authenticateJWT, authorizeRoles('admin'), (req, res) => {
  const { menteeId, mentorId } = req.body;
  // logic to match mentor to mentee (e.g., update a match array)
  res.send('Mentor assigned');
});

export default router;
