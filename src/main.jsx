import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Failed to find the root element')
} else {
  const root = createRoot(rootElement)
  try {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    )
    console.log('React app successfully mounted')
  } catch (error) {
    console.error('Failed to render the app:', error)
  }
}
