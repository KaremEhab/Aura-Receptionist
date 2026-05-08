import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.documentElement;
root.style.setProperty('--bp-mobile', import.meta.env.VITE_BP_MOBILE || '768px');
root.style.setProperty('--bp-ipad', import.meta.env.VITE_BP_IPAD || '1410px');
root.style.setProperty('--bp-landscape', import.meta.env.VITE_BP_LANDSCAPE || '1440px');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
