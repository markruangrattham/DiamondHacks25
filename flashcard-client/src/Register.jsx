import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';

const Register = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>📝 Register</h2>

        <form onSubmit={handleRegister}>
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
          <button type="submit" className="primary-btn">Sign Up</button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

        <p className="link">
          Already have an account? <Link to="/login" className="link">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
