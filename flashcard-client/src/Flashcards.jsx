import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db, addDoc, collection } from './firebase';  // Import Firestore methods
import './Flashcards.css';

const Flashcards = () => {
  const { state } = useLocation(); // Access passed state
  const { questions, answers } = state || {}; // Destructure questions and answers
  const [flippedCards, setFlippedCards] = useState([]); // Track flipped cards
  const [currentQuestions, setCurrentQuestions] = useState(questions); // Track the current set of questions
  const [currentAnswers, setCurrentAnswers] = useState(answers); // Track the current set of answers
  const [newQuestion, setNewQuestion] = useState(''); // State for new question input
  const [newAnswer, setNewAnswer] = useState(''); // State for new answer input
  const [flashcardName, setFlashcardName] = useState(''); // State for flashcard set name
  const [showNotification, setShowNotification] = useState(false); // State to show notification
  const [showAddNotification, setShowAddNotification] = useState(false); // State for add question notification
  const [showModal, setShowModal] = useState(false); // State for showing modal popup

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

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
  };

  const handleAddQuestion = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      return;
    }

    setCurrentQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setCurrentAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    setNewQuestion('');
    setNewAnswer('');
    setShowAddNotification(true);
    setTimeout(() => setShowAddNotification(false), 3000);
  };

  // Function to save the flashcard set to Firestore
  const handleSave = async () => {
    if (!flashcardName.trim()) {
      alert('Please enter a name for the flashcard set');
      return;
    }

    try {
      // Save to Firestore
      const docRef = await addDoc(collection(db, 'flashcardSets'), {
        name: flashcardName,
        questions: currentQuestions,
        answers: currentAnswers,
        createdAt: new Date(),
      });
      console.log('Flashcard set saved with ID: ', docRef.id);
      alert('Flashcard set saved successfully!');
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('Error saving flashcard set');
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
        </nav>
      </header>

      <div className="main-content">
        <h1>Add A FlashCard</h1>
        
        {/* Notification */}
        {showNotification && (
          <div className="notification">
            <p>Flashcard has been deleted</p>
          </div>
        )}
        
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

        {/* Flashcard List */}
        <div className="flashcard-page">
          <h1>Questions</h1>
          <div className="flashcards-list">
            {currentQuestions && currentAnswers && currentQuestions.length > 0 ? (
              currentQuestions.map((question, index) => (
                <div key={index} className="flashcard">
                  <p><strong>Q:</strong> {question}</p>
                  <button onClick={() => handleFlip(index)}>
                    {flippedCards.includes(index) ? 'Hide Answer' : 'Flip to Show Answer'}
                  </button>
                  {flippedCards.includes(index) && (
                    <p><strong>A:</strong> {currentAnswers[index]}</p>
                  )}
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

        {/* Flashcard Set Name */}
        <div className="flashcard-name">
          <button onClick={() => setShowModal(true)} className="save-flashcards-btn">Save Flashcards</button>
        </div>

        {/* Modal for Name Input */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Enter a Name for Your Flashcard Set</h3>
              <input
                type="text"
                placeholder="Enter flashcard set name"
                value={flashcardName}
                onChange={(e) => setFlashcardName(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
