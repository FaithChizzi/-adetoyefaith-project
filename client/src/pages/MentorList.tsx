import React, { useEffect, useState } from 'react';
import { getMentors } from '../api/mentorApi';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      const data = await getMentors();
      setMentors(data);
    };

    fetchMentors();
  }, []);

  return (
    <ul>
      {mentors.map((mentor: any) => (
        <li key={mentor.id}>{mentor.name}</li>
      ))}
    </ul>
  );
};

export default MentorList;
