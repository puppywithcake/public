import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { store } from './app/store';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider 
      clientId="971936419430-m08ii1qnd5k3n8bc7a6qrl0touc9lnhf.apps.googleusercontent.com"
    >
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
)