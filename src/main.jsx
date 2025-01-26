import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//Styles
import './css/reset.css'
import './css/index.css'
import 'modern-normalize/modern-normalize.css';

//Companents
import App from './Components/App/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
