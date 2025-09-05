import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppAuthProvider } from '@/contexts/AuthContext'
import { router } from '@/router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppAuthProvider>
      <RouterProvider router={router} />
    </AppAuthProvider>
  </StrictMode>,
)
