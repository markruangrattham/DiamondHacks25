import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Flashcards.css'; // reuse your existing styles

const SavedFlashcards = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setId, setName } = location.state || {};

  const [user, setUser] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [loading, setLoading] = useState(true);

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
          const data = docSnap.data();
          setFlashcards(data.flashcards || []);
        }
      } catch (err) {
        console.error("Error fetching saved flashcards:", err);
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

  if (!user) {
    navigate('/login');
    return null;
  }

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
        <h1>{setName || 'Saved Flashcards'}</h1>

        <div className="flashcard-page">
          <h1>Questions</h1>
          <div className="flashcards-list">
            {loading ? (
              <p>Loading flashcards...</p>
            ) : flashcards.length === 0 ? (
              <p>No flashcards found in this set.</p>
            ) : (
              flashcards.map((card, index) => (
                <div
                  key={index}
                  className={`flashcard ${flippedCards.includes(index) ? 'flipped' : ''}`}
                  onClick={() => handleFlip(index)}
                >
                  <div className="flashcard-inner">
                    <div className="flashcard-front">
                      <p><strong>Q:</strong> {card.question}</p>
                    </div>
                    <div className="flashcard-back">
                      <p><strong>A:</strong> {card.answer}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedFlashcards;
