import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './Create.css';

export default function Create() {
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

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setQuestions(data.questions);
      setAnswers(data.answers);
      setInput('');
    } catch (err) {
      console.error('Text submission failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file');
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/upload-pdf', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setQuestions(data.questions);
      setAnswers(data.answers);
    } catch (err) {
      console.error('File upload failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <h1>📚 Welcome to FlashcardGPT</h1>
      {user && <p className="user-info">Logged in as <strong>{user.email}</strong></p>}
      <p>You can use the site whether signed in or not. Sign in to save progress!</p>

      <div className="mode-toggle">
        <button onClick={() => setMode('text')} className={mode === 'text' ? 'active' : ''}>Text Input</button>
        <button onClick={() => setMode('file')} className={mode === 'file' ? 'active' : ''}>Upload PDF</button>
      </div>

      {mode === 'text' ? (
        <form onSubmit={handleTextSubmit} className="input-form">
          <input
            type="text"
            placeholder="Type your content..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
        </form>
      ) : (
        <form onSubmit={handleFileUpload} className="input-form">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload & Generate'}</button>
        </form>
      )}

      {questions.length > 0 && answers.length > 0 && (
        <div className="flashcard-section">
          <h2>Flashcard {currentIndex + 1} of {questions.length}</h2>
          <div className="flashcard">
            <p><strong>Q:</strong> {questions[currentIndex]}</p>
            {showAnswer && <p className="answer"><strong>A:</strong> {answers[currentIndex]}</p>}
            <button onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
          </div>

          <div className="nav-buttons">
            <button onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>
              Previous
            </button>
            <button onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))} disabled={currentIndex === questions.length - 1}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
