import axios from './axios';

export const getMentors = async () => {
  const response = await axios.get('/mentors');
  return response.data;
};
