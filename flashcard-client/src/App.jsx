import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // adjust path as needed

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Flashcards from './Flashcards';
import Login from './Login';
import Register from './Register';
import Study from './StudyPage';
import SavedFlashcards from './Savedflashedcards';
import EditFlashcards from './EditFlashcards';
import ForgotPassword from './ForgotPassword';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/create" element={<Create user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/study" element={<Study user={user} loading={loading} />} />
        <Route path="/flashcards" element={<Flashcards user={user} />} />
        <Route path="/saved-flashcards" element={<SavedFlashcards user={user} />} />
        <Route path="/edit-flashcards" element={<EditFlashcards user={user} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Redirect to home if no route matches */}
        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;
