import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import logo from './assets/Logo.png'

// Ensure favicon uses src/assets/Logo.png (works with Vite import)
try {
  const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = logo;
  if (!document.querySelector("link[rel~='icon']")) document.getElementsByTagName('head')[0].appendChild(link);
} catch (e) {
  // ignore in non-browser environments
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
