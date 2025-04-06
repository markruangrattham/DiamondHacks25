import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Flashcards.css'; // Import your CSS file

const Flashcards = () => {
  const { state } = useLocation(); // Access passed state
  const { questions, answers } = state || {}; // Destructure questions and answers
  const [flippedCards, setFlippedCards] = useState([]); // Track flipped cards
  const [currentQuestions, setCurrentQuestions] = useState(questions); // Track the current set of questions
  const [currentAnswers, setCurrentAnswers] = useState(answers); // Track the current set of answers
  const [newQuestion, setNewQuestion] = useState(''); // State for new question input
  const [newAnswer, setNewAnswer] = useState(''); // State for new answer input
  const [showDeleteNotification, setShowDeleteNotification] = useState(false); // State for delete notification
  const [showAddNotification, setShowAddNotification] = useState(false); // State for add question notification

  const [user, setUser] = useState(null);  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
 
  
  const handleFlip = (index) => {
    setFlippedCards((prev) => {
      const newFlippedCards = [...prev];
      if (newFlippedCards.includes(index)) {
        newFlippedCards.splice(newFlippedCards.indexOf(index), 1);
      } else {
        newFlippedCards.push(index);
      }
      return newFlippedCards;
    });
  };

  const handleDelete = (index) => {
    const updatedQuestions = [...currentQuestions];
    const updatedAnswers = [...currentAnswers];
    
    updatedQuestions.splice(index, 1); // Remove the question at the clicked index
    updatedAnswers.splice(index, 1); // Remove the corresponding answer
    
    setCurrentQuestions(updatedQuestions); // Update the state with the remaining questions
    setCurrentAnswers(updatedAnswers); // Update the state with the remaining answers

    // Show delete notification
    setShowDeleteNotification(true);
    setTimeout(() => setShowDeleteNotification(false), 3000); // Hide notification after 3 seconds
  };

  const handleAddQuestion = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      return; // If no question or answer is entered, do nothing
    }

    setCurrentQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setCurrentAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    setNewQuestion(''); // Clear input after adding question
    setNewAnswer(''); // Clear input after adding answer

    // Show add notification
    setShowAddNotification(true);
    setTimeout(() => setShowAddNotification(false), 3000); // Hide notification after 3 seconds
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
        <h1>Flashcards</h1>
        
        {/* Notification for Deletion */}
        {showDeleteNotification && (
          <div className="notification delete-notification">
            <p>Flashcard has been deleted</p>
          </div>
        )}

        {/* Notification for Adding a New Question */}
        {showAddNotification && (
          <div className="notification add-notification">
            <p>New flashcard has been added</p>
          </div>
        )}

        <div className="flashcard-page">
          <h1>Flashcards</h1>
          <div className="flashcards-list">
            {currentQuestions && currentAnswers && currentQuestions.length > 0 ? (
              currentQuestions.map((question, index) => (
                <div key={index} className="flashcard">
                  <p><strong>Q:</strong> {question}</p>
                  {/* Button to flip the card */}
                  <button onClick={() => handleFlip(index)}>
                    {flippedCards.includes(index) ? 'Hide Answer' : 'Flip to Show Answer'}
                  </button>
                  {/* Conditionally render the answer if the card is flipped */}
                  {flippedCards.includes(index) && (
                    <p><strong>A:</strong> {currentAnswers[index]}</p>
                  )}
                  {/* Delete button */}
                  <button className="delete" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No flashcards to show.</p>
            )}
          </div>
        </div>

        {/* Add New Question */}
        <div className="add-question">
          <input
            type="text"
            placeholder="Enter a new question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter the answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button onClick={handleAddQuestion}>Add Question</button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;