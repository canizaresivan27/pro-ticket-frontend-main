import App from '@/App'
//import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { SocketProvider } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SocketProvider>
    <App />
  </SocketProvider>
)

/* <React.StrictMode> */
