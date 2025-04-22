import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import backgroundImage from '../../assets/images/login-bg.jpg'

const Login = ({ login, isAuthenticated, user }) => {
  const shapeRef = useRef(null);
  const navigate = useNavigate()
  const location = useLocation();
  const [formData, setFormData] = useState({ 
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
          await login(email, password);
      } catch (err) {
          alert('Confirm login credentials')
          console.log(err);
      } finally {
          setLoading(false); 
      }
  };

  const continueWithGoogle = async () => {
    try {
      // const response = await fetch('https://test.tarase.com/auth/o/google-oauth2/?redirect_uri=https://auth.tarase.com');
      const response = await fetch('http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:3000');
      const data = await response.json();
      window.location.replace(data.authorization_url);
    } catch (error) {
      console.log(error);
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  //is authenticated redirect
  if (isAuthenticated) {
      return (
          navigate('/dashboard')
      );
  } 

  const handleLogin = async () => {
      try {
          const response = await login(email, password);
          console.log(response)
  
          if (response.success) {
              // Display a success toast only when the login is successful
              toast.success('Login successful', { toastId: 'success' });
              navigate('/dashboard');
          } else if (response.error) {
              // If the API response contains an 'error' property, show an error toast with the error message.
              toast.error(response.error, { toastId: 'error' });
          } else {
              // Handle other unexpected responses.
              toast.error('An error occurred. Please try again.', { toastId: 'error' });
          }
      } catch (err) {
          // Handle any other errors, e.g., network issues, and show an error toast.
          toast.error('An error occurred. Please try again.', { toastId: 'error' });
          console.log(err);
      }
  }; 

  return (
    <main className="main-content main-content-bg mt-0 ps">
        <div className="page-header min-vh-100" style={{backgroundImage: `url(${backgroundImage})`, backgroundPosition: "center center"}}>
            <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-7">
                        <div className="card border-0 mb-0">

                            <div className="card-header bg-transparent">
                                <h5 className="text-dark text-center mt-2 mb-3">Sign in</h5>
                                <div className="col-12 me-auto px-1">
                                <a className="btn btn-outline-light w-100" href="#">
                                <svg width="24px" height="32px" viewBox="0 0 64 64" version="1.1">
                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g transform="translate(3.000000, 2.000000)" fillRule="nonzero">
                                <path d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267" fill="#4285F4"></path>
                                <path d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667" fill="#34A853"></path>
                                <path d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782" fill="#FBBC05"></path>
                                <path d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769" fill="#EB4335"></path>
                                </g>
                                </g>
                                </svg>
                                </a>
                                </div>
                            </div>

                            <div className="card-body px-lg-5 pt-0">
                                
                                <form className="text-start" method="POST" onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            placeholder="Email" 
                                            name="email"
                                            aria-label="Email"
                                            value={email}
                                            onChange={(e) => onChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            className="form-control"
                                            placeholder="*******"
                                            aria-label="Password"
                                            value={password}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <span
                                            className="input-group-text bg-gray-100"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <i className={`fa ${showPassword ? 'fa-eye text-white' : 'fa-eye-slash'}`}></i>
                                        </span>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            id="rememberMe"
                                        />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2" onClick={handleLogin}>
                                        {loading ? 'Signing In...' : 'Sign in'}
                                        </button>
                                    </div>
                                    <div className="form-check-label mt-2">
                                        Forgot password? 
                                        <Link to="/reset-password" className="text-dark font-weight-bolder">Reset</Link>
                                    </div>
                                    
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
)
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
