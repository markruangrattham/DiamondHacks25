import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, addDoc, collection } from './firebase';  // Import Firestore methods
import { useNavigate } from 'react-router-dom';
import './Create.css';

export default function Create() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('text');
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5); // State for the number of questions
  const navigate = useNavigate(); // Initialize navigate hook

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
        body: JSON.stringify({ message: input, numQuestions }), // Send numQuestions in request
      });
      const data = await res.json();
      setQuestions(data.questions);
      setAnswers(data.answers);
      setInput('');
     
      navigate('/flashcards', { state: { questions: data.questions, answers: data.answers } }); // Pass data via state
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
    formData.append('numQuestions', numQuestions); // Add numQuestions to the form data

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/upload-pdf', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setQuestions(data.questions);
      setAnswers(data.answers);
      // After generating flashcards, save to Firestore
      
      navigate('/flashcards', { state: { questions: data.questions, answers: data.answers } }); // Pass data via state
    } catch (err) {
      console.error('File upload failed', err);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="create-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">📖 StudyGenius</div>
        <nav className="navbar-right">
          <a href="/">Home</a>
          <a href="/create">Create</a>
          <a href="/study">Study</a>
          {user ? (
            <button onClick={() => auth.signOut()}>Logout</button>
          ) : (
            <a href="/login">
              <button className="get-started">Login</button>
            </a>
          )}
        </nav>
      </header>

      <div className="main-content">
        <h1>Generate Flashcards</h1>
        <p className="description">
          Enter a prompt or lecture notes to generate flashcards for studying.
        </p>

        <div className="mode-toggle">
          <button onClick={() => setMode('text')} className={mode === 'text' ? 'active' : ''}>
            Text Input
          </button>
          <button onClick={() => setMode('file')} className={mode === 'file' ? 'active' : ''}>
            Upload PDF
          </button>
        </div>

        {/* Number of Questions Slider */}
        <div className="question-slider">
          <label htmlFor="numQuestions">Number of Questions (note will not always give exact number of questions):</label>
          <input
            type="range"
            id="numQuestions"
            min="1"
            max="20"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
          />
          <span>{numQuestions}</span>
        </div>

        {mode === 'text' ? (
          <form onSubmit={handleTextSubmit} className="input-form">
            <input
              type="text"
              placeholder="Type your content..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleFileUpload} className="input-form">
          <div className="file-upload-container">
            <label className="file-upload-label">
              Choose File
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="file-upload-input"
              />
            </label>
            <div className={`file-upload-status ${file ? 'file-chosen' : ''}`}>
              {file ? file.name : 'No file chosen'}
            </div>
          </div>
          
          

  
          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload & Generate'}
          </button>
        </form>

        
        
        )}
        

       
      </div>
    </div>
  );
}
