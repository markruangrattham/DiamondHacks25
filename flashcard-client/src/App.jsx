// App.jsx
import { useState } from 'react';



function App() {
  const [mode, setMode] = useState('text');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [file , setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('http://localhost:3001/echo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file");

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    const res = await fetch('http://localhost:3001/upload-pdf', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResponse(
      data.flashcards
        ? JSON.stringify(data.flashcards, null, 2)
        : 'No flashcards returned'
    );
    setLoading(false);
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

      {/* Output */}
      {response && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <strong>Response:</strong>
          <br />
          {response}
        </div>
      )}
    </div>
  );
}

export default App;
