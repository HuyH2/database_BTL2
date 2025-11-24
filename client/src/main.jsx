import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/*Bọc AuthProvider ra ngoài App */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)