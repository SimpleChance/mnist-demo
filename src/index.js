// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Render the main App component into the root element of the HTML document.
// This is the entry point of the React application.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
