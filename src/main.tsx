// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GeneralProvider } from './context/GeneralContext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <GeneralProvider>
      <App />
    </GeneralProvider>
  // </StrictMode>,
)
