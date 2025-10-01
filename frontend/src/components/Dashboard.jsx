import React, { useEffect, useState } from 'react';
import api, { setAuthToken } from '../api';

function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    

    api.get('/dashboard')
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage('Unauthorized. Please login.'));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
