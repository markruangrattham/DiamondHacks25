import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import "./auth.css";



const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      navigate('/'); // ✅ redirect to home
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate('/'); // ✅ redirect to home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>🔐 Login</h2>
  
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <button type="submit" className="primary-btn">Sign In</button>
        </form>
  
        <div style={{ margin: '1rem 0', color: '#aaa' }}>or</div>
  
        <button onClick={handleGoogleLogin} className="google-btn">Sign in with Google</button>
  
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
  
        <Link to="/forgot-password" className="link">Forgot Password?</Link>
        <p className="link">Don't have an account? <Link to="/register" className="link">Register</Link></p>
      </div>
    </div>
  );
}  
export default Login;
