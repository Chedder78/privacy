import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ARManager from './components/ARManager'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ARManager />
  </StrictMode>
)
