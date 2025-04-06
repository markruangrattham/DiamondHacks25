// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Register from './Register';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const [mode, setMode] = useState('text');
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('http://localhost:3001/echo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setQuestions(data.questions);
    setAnswers(data.answers);
    setInput('');
    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file');

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    const res = await fetch('http://localhost:3001/upload-pdf', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setQuestions(data.questions);
    setAnswers(data.answers);
    setLoading(false);
  };

  return (
    <Router>
      {/* 🔝 Navbar */}
      <div className="navbar">
        {user ? (
          <button onClick={handleLogout}>Sign Out</button>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
  
      <Routes>
        {/* 🏠 Home route with flashcards */}
        <Route
          path="/"
          element={
            <div className="main-container">
              <h1>📚 Welcome to FlashcardGPT</h1>
              {user && <p>Logged in as <strong>{user.email}</strong></p>}
              <p>You can use the basic site whether you're signed in or not.</p>
              <p>If you want to save your progress, sign in above!</p>
  
              {/* Input Mode Selector */}
              <div className="mode-buttons">
                <button onClick={() => setMode('text')} disabled={mode === 'text'}>Text Input</button>
                <button onClick={() => setMode('file')} disabled={mode === 'file'}>Upload PDF</button>
              </div>
  
              {/* Text Input */}
              {mode === 'text' && (
                <form onSubmit={handleTextSubmit}>
                  <input
                    type="text"
                    placeholder="Say something..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </form>
              )}
  
              {/* PDF Upload */}
              {mode === 'file' && (
                <form onSubmit={handleFileUpload}>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload & Generate'}
                  </button>
                </form>
              )}
  
              {/* Flashcard View */}
              {questions.length > 0 && answers.length > 0 && (
                <div>
                  <h2>Flashcard {currentIndex + 1} of {questions.length}</h2>
                  <div className="flashcard-box">
                    <strong>Q:</strong> {questions[currentIndex]}
                    {showAnswer && (
                      <div className="flashcard-answer">
                        <strong>A:</strong> {answers[currentIndex]}
                      </div>
                    )}
                  </div>
  
                  <div>
                    <button onClick={() => setShowAnswer(prev => !prev)}>
                      {showAnswer ? 'Hide Answer' : 'Show Answer'}
                    </button>
                  </div>
  
                  <div className="flashcard-nav">
                    <button
                      onClick={() => {
                        setCurrentIndex((prev) => Math.max(0, prev - 1));
                        setShowAnswer(false);
                      }}
                      disabled={currentIndex === 0}
                    >
                      Previous
                    </button>
  
                    <button
                      onClick={() => {
                        setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
                        setShowAnswer(false);
                      }}
                      disabled={currentIndex === questions.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          }
        />
  
        {/* 🔐 Auth routes */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}
export default App;  