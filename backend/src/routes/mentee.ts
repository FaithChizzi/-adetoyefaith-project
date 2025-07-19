import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';
// import { mentors, mentorshipRequests } from '../data/...';

const router = express.Router();

// View list of mentors (for mentees)
router.get('/mentors', authenticateJWT, authorizeRoles('mentee'), (req, res) => {
  // Filter mentors by skill, availability, etc. (replace with real logic)
  res.status(200).json({ mentors: [] }); // Dummy response for now
});

//  Request mentorship
router.post('/request', authenticateJWT, authorizeRoles('mentee'), (req, res) => {
  const { mentorId, message } = req.body;

  // Save the mentorship request to a data store
  const request = {
    id: Date.now().toString(),
    mentorId,
    menteeId: req.user?.id,
    message,
    status: 'pending',
  };

  // Store in-memory or in DB
  res.status(201).json({ message: 'Request sent', request });
});

export default router;
