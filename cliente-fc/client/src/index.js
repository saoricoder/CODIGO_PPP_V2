import React from 'react';
import ReactDOM from 'react-dom/client';
import TagManager from 'react-gtm-module';
import './styles/index.css';
import App from './App';
const tagManagerArgs = {
  gtmId: 'GTM-5X998RDZ'  // Reemplaza XXXXXXX con tu ID de GTM
}

TagManager.initialize(tagManagerArgs)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


