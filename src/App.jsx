import { useEffect, lazy, Suspense  } from 'react'
import './assets/style/style.css'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'




// Lazy-loaded components
const Login = lazy(() => import('./pages/auth/login'));

function App() {

  return (
    <Router>
        <Routes>
            {/* Auth Pages */}
            <Route exact path="/" element={<Login />}/>
        </Routes>
    </Router>
  )
}

export default App
