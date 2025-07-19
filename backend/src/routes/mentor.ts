import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';
// import { availability, mentorshipRequests, matches } from '../data/...'

const router = express.Router();

// 🗓 Set availability
router.post('/availability', authenticateJWT, authorizeRoles('mentor'), (req, res) => {
  const { times } = req.body;
  // Save to in-memory store or DB
  res.status(200).json({ message: 'Availability saved', times });
});

// View mentorship requests
router.get('/requests', authenticateJWT, authorizeRoles('mentor'), (req, res) => {
  // Return pending requests to this mentor
  res.status(200).json({ requests: [] }); // Replace with real data
});

//  Accept or  reject mentee
router.post('/accept', authenticateJWT, authorizeRoles('mentor'), (req, res) => {
  const { requestId, accept } = req.body;
  // Update request status and match if accepted
  res.status(200).json({ message: accept ? 'Accepted' : 'Rejected' });
});

export default router;
