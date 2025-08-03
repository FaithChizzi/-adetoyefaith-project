// import express from 'express';
// import { users } from '../data/users';
// import { authenticateJWT, authorizeRoles } from '../middleware/auth';

// const router = express.Router();

// router.get('/users', authenticateJWT, authorizeRoles('admin'), (req, res) => {
//   res.json(users);
// });

// router.post('/assign-mentor', authenticateJWT, authorizeRoles('admin'), (req, res) => {
//   const { menteeId, mentorId } = req.body;
//   // logic to match mentor to mentee (e.g., update a match array)
//   res.send('Mentor assigned');
// });

// export default router;
import express from 'express';
import { users } from '../data/users'; // This should be a shared in-memory or DB user list
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = express.Router();

// ✅ GET /api/admin/users - Admin can view all users
router.get('/users', authenticateJWT, authorizeRoles('admin'), (req, res) => {
  res.json(users);
});

// ✅ POST /api/admin/assign-mentor - Admin assigns mentor to mentee
router.post('/assign-mentor', authenticateJWT, authorizeRoles('admin'), (req, res) => {
  const { menteeId, mentorId } = req.body;

  if (!menteeId || !mentorId) {
    return res.status(400).json({ error: 'menteeId and mentorId are required' });
  }

  const mentee = users.find(u => u.id === menteeId && u.role === 'mentee');
  const mentor = users.find(u => u.id === mentorId && u.role === 'mentor');

  if (!mentee || !mentor) {
    return res.status(404).json({ error: 'Mentor or mentee not found' });
  }

  // You can enhance this logic later by storing this assignment somewhere
  if (!mentee.assignedMentor) {
    (mentee as any).assignedMentor = mentor.id;
  }

  res.json({ message: `Mentor ${mentor.email} assigned to mentee ${mentee.email}` });
});

export default router;
