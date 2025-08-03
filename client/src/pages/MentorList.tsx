import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem('token'); // or however you store it

        const response = await axios.get('/api/mentee/mentors', {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send JWT token
          },
        });

        setMentors(response.data.mentors);
      } catch (err: any) {
        console.error('Error fetching mentors:', err);
        setError('Failed to load mentors.');
      }
    };

    fetchMentors();
  }, []);

  return (
    <div>
      <h2>Available Mentors</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {mentors.map((mentor: any) => (
          <li key={mentor.id}>{mentor.name} - Skills: {mentor.skills.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default MentorList;
