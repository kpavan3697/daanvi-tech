import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NotFound from './NotFound'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

function Router() {
  // Normalise trailing slashes so /privacy/ and /privacy both resolve.
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  switch (path) {
    case '/':        return <App />
    case '/privacy': return <Privacy />
    case '/terms':   return <Terms />
    default:         return <NotFound />
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)