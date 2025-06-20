import { useEffect, lazy, Suspense  } from 'react'
import './assets/css/argon-dashboard.min9c7f.css'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import { load_user } from './actions/auth';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import Layout from './hoc/Layout'


// Lazy-loaded components
const Login = lazy(() => import('./pages/auth/login'));
const AdminSignup = lazy(() => import('./pages/auth/AdminSignup'))
const Orders = lazy(() => import('./pages/sales/Orders'))
const Drivers = lazy(() => import('./pages/drivers/Drivers'))
const Dashboard = lazy(() => import('./pages/general/Dashboard'))
const Routing = lazy(() => import('./pages/general/Routes'))
const Crates = lazy(() => import('./pages/crates/Crates'))

function App() {

  return (
    <Provider store={store}>
    <ToastContainer position="bottom-right" autoClose={5000} />
      <Router>
        <Suspense fallback={<div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div>
          </div>}>
          <Routes>
              {/* Auth Pages */}
              <Route exact path="/" element={<Login />}/>
              <Route path="/admin-signup" element={<AdminSignup />} />
          </Routes>
          <Layout>
            <Routes>
              {/* Dashboard */}
              <Route exact path='/dashboard' element={<Dashboard />}/>

              {/* Orders */}
              <Route exact path='/orders' element={<Orders />}/>

              {/* Drivers */}
              <Route exact path='/drivers' element={<Drivers />}/>

              {/* Crates */}
              <Route exact path='/crates' element={<Crates />}/>

              {/* Routing */}
              <Route exact path='/routing' element={<Routing />}/>
            </Routes>
          </Layout>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default App
