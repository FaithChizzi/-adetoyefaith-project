// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import adminRoutes from './routes/admin';
// app.use('/api/admin', adminRoutes); 

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // TODO: Add routes here
// // app.use('/api/auth', authRoutes);

// export default app;


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mentorRoutes from './routes/mentor';
import menteeRoutes from './routes/mentee';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin'; // 


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Register your routes here
app.use('/api', authRoutes);            //  Login/Register
app.use('/api/admin', adminRoutes);     //  Admin-only routes

app.use('/api/mentor', mentorRoutes);       //  Attach it to /api/mentor

app.use('/api/mentee', menteeRoutes);       //  Register the route
export default app;

