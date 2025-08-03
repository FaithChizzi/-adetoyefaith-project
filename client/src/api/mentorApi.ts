// import axios from './axios';

// export const getMentors = async () => {
//   const response = await axios.get('/mentors');
//   return response.data;
// };


// src/api/mentorApi.ts
// import axios from './axios';

// export const getMentors = async () => {
//   const token = localStorage.getItem('token'); // Get token from storage

//   const response = await axios.get('/mentors', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data.mentors; // Match backend shape: { mentors: [...] }
// };

// src/api/mentorApi.ts
import axios from './axios';

export const getMentors = async () => {
  const response = await axios.get('/mentee/mentors'); // Correct path
  return response.data.mentors;
};
