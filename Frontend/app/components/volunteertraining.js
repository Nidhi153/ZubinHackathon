// React Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './global.module.scss';

const YoutubeEmbedPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleConfirmClick = () => {
    if (isChecked) {
      navigate('/another-page');
    } else {
      alert('Please check the checkbox before confirming.');
    }
  };

  return (
    <div className="container">
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://youtu.be/ZKc48CJQa4M?si=CqPq-ORk9gOnuUoq"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="checkbox-container">
        <label>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          I have watched the video
        </label>
      </div>
      <button className="confirm-button" onClick={handleConfirmClick}>
        Confirm
      </button>
    </div>
  );
};

export default YoutubeEmbedPage;

// Node.js Server
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/another-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'another-page.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});