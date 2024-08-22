"use clinet";
import React, { useEffect, useState } from 'react';

const SomeComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

      try {
        const response = await fetch('/api/protected-route', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.log('Failed to fetch protected data:', response.statusText);
          setError('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setError('An error occurred');
      }
    };

    fetchProtectedData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default SomeComponent;
