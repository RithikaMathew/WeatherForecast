import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main class="about-container">
      <p>There's nothing here!</p>
      <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;