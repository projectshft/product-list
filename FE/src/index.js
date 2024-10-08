import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './assets/styles/index.css';  // Assuming you have a global CSS file
import 'bootstrap/dist/js/bootstrap.min.js';
// In your App.js or index.js file
import './assets/styles/global.css'; // Adjust the path as necessary





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
