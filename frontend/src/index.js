import React from 'react';
import ReactDOM from 'react-dom/client'; // NOTE the change here
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
