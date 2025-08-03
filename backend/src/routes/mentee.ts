import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

// Mock mentors list for demonstration
const mentors = [
  {
    id: '1',
    name: 'Alice Smith',
    skills: ['JavaScript', 'Node.js'],
    available: true,
  },
  {
    id: '2',
    name: 'Bob Johnson',
    skills: ['Python', 'Data Science'],
    available: false,
  },
  {
    id: '3',
    name: 'Carol Lee',
    skills: ['React', 'UI/UX'],
    available: true,
  },
];

const router = express.Router();

// View list of mentors (for mentees)
router.get('/mentors', authenticateJWT, authorizeRoles('mentee'), (req, res) => {
  // Example: filter only available mentors
  const availableMentors = mentors.filter((mentor) => mentor.available);
  res.status(200).json({ mentors: availableMentors });
});

// Request mentorship
router.post('/request', authenticateJWT, authorizeRoles('mentee'), (req, res) => {
  const { mentorId, message } = req.body;

  if (!mentorId || !message) {
    return res.status(400).json({ error: 'mentorId and message are required' });
  }

  const request = {
    id: Date.now().toString(),
    mentorId,
    menteeId: req.user?.id,
    message,
    status: 'pending',
  };

  // In production, store this in a database
  // For now, respond with the request object
  res.status(201).json({ message: 'Request sent', request });
});

export default router;

// import express from 'express';
// import { authenticateJWT, authorizeRoles } from '../middleware/auth';
// // import { mentors, mentorshipRequests } from '../data/...';

// const router = express.Router();

// // View list of mentors (for mentees)
// router.get('/mentors', authenticateJWT, authorizeRoles('mentee'), (req, res) => {
//   // Filter mentors by skill, availability, etc. (replace with real logic)
//   res.status(200).json({ mentors: [] }); // Dummy response for now
// });

// //  Request mentorship
// router.post('/request', authenticateJWT, authorizeRoles('mentee'), (req, res) => {
//   const { mentorId, message } = req.body;

//   // Save the mentorship request to a data store
//   const request = {
//     id: Date.now().toString(),
//     mentorId,
//     menteeId: req.user?.id,
//     message,
//     status: 'pending',
//   };

//   // Store in-memory or in DB
//   res.status(201).json({ message: 'Request sent', request });
// });

// export default router;
