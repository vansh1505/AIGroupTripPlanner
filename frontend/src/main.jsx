import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#121214',
            color: '#fff',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '12px',
            fontSize: '14px',
            padding: '12px 24px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#D4AF37',
              secondary: '#121214',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#121214',
            },
          },
        }}
      />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
