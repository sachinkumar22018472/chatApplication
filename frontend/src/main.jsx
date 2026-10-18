import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"

export const serverUrl = import.meta.env.VITE_BACKEND_URL || 
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://chatapplication-backend-d5sz.onrender.com")

import './index.css'
import App from './App.jsx'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>

    <App />
  </Provider>
  </BrowserRouter>
)
