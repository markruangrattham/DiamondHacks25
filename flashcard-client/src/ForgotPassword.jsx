import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus('✅ Password reset email sent!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>🔑 Reset Password</h2>

        <form onSubmit={handleReset}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <button type="submit" className="primary-btn">Send Reset Link</button>
        </form>

        {status && <p style={{ color: 'green', marginTop: '1rem' }}>{status}</p>}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

        <p className="link">
          Back to <Link to="/login" className="link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
