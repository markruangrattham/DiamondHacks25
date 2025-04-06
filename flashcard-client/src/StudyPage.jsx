import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import './StudyPage.css';

const StudyPage = ({ user, loading }) => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSets = async () => {
      if (!user) return;

      try {
        const snapshot = await getDocs(collection(db, 'users', user.uid, 'flashcardSets'));
        const sets = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setFlashcardSets(sets);
      } catch (err) {
        console.error("Error fetching flashcard sets:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchSets();
  }, [user]);

  const handleDelete = async (setId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this flashcard set?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'flashcardSets', setId));
      setFlashcardSets(prev => prev.filter(set => set.id !== setId));
    } catch (error) {
      console.error("Error deleting flashcard set:", error);
    }
  };

  const handleEdit = (setId, setName) => {
    navigate('/edit-flashcards', { state: { editing: true, setId, setName } });
  };

  if (loading || fetching) return <p>Loading flashcard sets...</p>;
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="study-container">
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

      <h2>📘 Choose a Flashcard Set</h2>

      <ul>
        {flashcardSets.length === 0 ? (
          <p>No flashcard sets found.</p>
        ) : (
          flashcardSets.map(set => (
            <li className="flashcard-set-item" key={set.id}>
              <span onClick={() => navigate('/saved-flashcards', {
                state: { setId: set.id, setName: set.name }
              })}>
                {set.name}
              </span>
              <div className="set-actions">
                <button className="edit-btn" onClick={() => handleEdit(set.id, set.name)}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(set.id)}>🗑️</button>
                </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StudyPage;
