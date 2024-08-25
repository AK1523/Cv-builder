import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional: Create a CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Resume Builder</h1>
      <p>Select an option below to get started:</p>
      <div className="button-container">
        <Link to="/form" className="nav-button">Create Resume</Link>
        <Link to="/preview" className="nav-button">View Resume Preview</Link>
      </div>
    </div>
  );
};

export default Home;
