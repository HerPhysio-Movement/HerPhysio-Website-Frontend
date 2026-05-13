// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';   // back to original
import { Toaster } from 'react-hot-toast';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import './styles/globals.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <App />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: { background: '#333', color: '#fff' },
              success: { style: { background: '#10b981' }, iconTheme: { primary: '#fff', secondary: '#10b981' } },
            }}
          />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);