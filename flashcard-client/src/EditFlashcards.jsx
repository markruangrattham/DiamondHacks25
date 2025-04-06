import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './editFlashcard.css'

const EditFlashcards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setId, setName } = location.state || {};

  const [user, setUser] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFlashcardSet = async () => {
      if (!user || !setId) return;

      try {
        const docRef = doc(db, 'users', user.uid, 'flashcardSets', setId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFlashcards(docSnap.data().flashcards || []);
        }
      } catch (error) {
        console.error("Error loading flashcards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcardSet();
  }, [user, setId]);

  const handleFlip = (index) => {
    setFlippedCards((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...flashcards];
    updated[index].question = value;
    setFlashcards(updated);
  };

  const handleAnswerChange = (index, value) => {
    const updated = [...flashcards];
    updated[index].answer = value;
    setFlashcards(updated);
  };

  const handleDelete = (index) => {
    const updated = [...flashcards];
    updated.splice(index, 1);
    setFlashcards(updated);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleAddFlashcard = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      alert('Please enter both a question and an answer.');
      return;
    }
  
    const newCard = {
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
    };
  
    setFlashcards((prev) => [...prev, newCard]);
    setNewQuestion('');
    setNewAnswer('');
  };
  

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'users', user.uid, 'flashcardSets', setId);
      await updateDoc(docRef, {
        flashcards,
        updatedAt: new Date(),
      });
      alert('Flashcards updated!');
      navigate('/study');
    } catch (error) {
      console.error('Save error:', error);
      alert('Could not save flashcards.');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="edit-container">
      <header className="navbar">
        <div className="logo">📖 StudyGenius</div>
        <nav className="navbar-right">
          <a href="/">Home</a>
          <a href="/create">Create</a>
          <a href="/study">Study</a>
          <button onClick={() => auth.signOut()}>Logout</button>
        </nav>
      </header>
  
      <div className="main-content">
        <h1>Edit: {setName}</h1>
  
        {showNotification && (
          <div className="notification delete-notification">
            <p>Flashcard deleted</p>
          </div>
        )}
  
        {/* Flashcards List */}
        <div className="edit-list">
          {loading ? (
            <p>Loading flashcards...</p>
          ) : flashcards.length === 0 ? (
            <p>No flashcards found.</p>
          ) : (
            flashcards.map((card, index) => (
              <div
                key={index}
                className={`edit-card ${flippedCards.includes(index) ? 'flipped' : ''}`}
              >
                <div className="edit-inner">
                  <div className="edit-front">
                    <label>Q:</label>
                    <textarea
                      value={card.question}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                      className="scrollable-textarea"
                    />
                  </div>
                  <div className="edit-back">
                    <label>A:</label>
                    <textarea
                      value={card.answer}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      className="scrollable-textarea"
                    />
                  </div>
                </div>
                <div className="card-buttons">
                  <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
  
        {/* Add Flashcard Section */}
        <div className="add-flashcard-form">
          <h2>Add Flashcard</h2>
          <label>Q:</label>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="scrollable-textarea"
            placeholder="Enter a new question"
          />
          <label>A:</label>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="scrollable-textarea"
            placeholder="Enter the answer"
          />
          <button className="add-button" onClick={handleAddFlashcard}>Add Flashcard</button>
        </div>
  
        {/* Save Button */}
        <div className="save-button-container">
          <button className="save-button" onClick={handleSave}>Save Changes</button>
        </div>
      </div> {/* end of main-content */}
    </div> // end of edit-container
  );
}
export default EditFlashcards;
  