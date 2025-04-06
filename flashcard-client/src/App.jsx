// App.jsx
import { useState } from 'react';
import { auth, provider } from  '.'
import { signInWithPopup } from 'firebase/auth';

const handleLogin = async () => {
  const result = await signInWithPopup(auth, provider);
  console.log('Logged in user:', result.user);
};


function App() {
  const [mode, setMode] = useState('text');
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setQuestions(data.questions);
      setAnswers(data.answers);
      setCurrentIndex(0);
      setShowAnswer(false);
      setInput('');
    } catch (error) {
      console.error('Text submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file");

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setQuestions(data.questions);
      setAnswers(data.answers);
      setCurrentIndex(0);
      setShowAnswer(false);
      setFile(null);
    } catch (error) {
      console.error('File upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Choose Input Type</h1>

      {/* Mode selector */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setMode('text')} disabled={mode === 'text'}>
          Text Input
        </button>{' '}
        <button onClick={() => setMode('file')} disabled={mode === 'file'}>
          Upload PDF
        </button>
      </div>

      {/* Text Input Section */}
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

      {/* File Upload Section */}
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

      {/* Flashcard Display */}
      {questions.length > 0 && answers.length > 0 && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <h2>Flashcard {currentIndex + 1} of {questions.length}</h2>

          <div style={{
  margin: '1rem auto',
  padding: '2rem',
  border: '2px solid #ccc',
  borderRadius: '12px',
  maxWidth: '600px',
  minHeight: '150px',
  background: '#f9f9f9',
  fontSize: '1.2rem',
  color: '#111', 
}}>
            <strong>Q:</strong> {questions[currentIndex]}
            {showAnswer && (
              <div style={{ marginTop: '1rem', color: '#2a8a2a' }}>
                <strong>A:</strong> {answers[currentIndex]}
              </div>
            )}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => setShowAnswer(prev => !prev)}>
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={() => {
                setCurrentIndex((prev) => Math.max(0, prev - 1));
                setShowAnswer(false);
              }}
              disabled={currentIndex === 0}
              style={{ marginRight: '1rem' }}
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
  );
}

export default App;
