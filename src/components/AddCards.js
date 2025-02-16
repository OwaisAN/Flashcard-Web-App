import React, { useState, useEffect } from 'react';



export default function AddCards() {
  const [flashcards, setFlashcards] = useState([]); // State to store flashcards
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Load flashcards from local storage
  useEffect(() => {
    const savedFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    setFlashcards(savedFlashcards)
  }, []);

  // Add a new flashcard
  const addFlashcard = (e) => {
    e.preventDefault(); // Prevent page reload
    const newFlashcards = [...flashcards, { question, answer }];
    setFlashcards(newFlashcards);
    localStorage.setItem('flashcards', JSON.stringify(newFlashcards)); // Save to local storage
    setQuestion(''); // Clear form
    setAnswer('');
  };

  return (
    <div className="app-container">
      <h1 className="title">Flashcard App</h1>

      <form onSubmit={addFlashcard} className="flashcard-form">
        <div className="form-group">
          <label className="label">Question:</label>
          <input
            className="input-field"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Answer:</label>
          <input
            className="input-field"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Flashcard</button>
      </form>

      <div className="flashcards-container">
        <h2>Flashcards</h2>
        {flashcards.length === 0 ? (
          <p>No flashcards added yet. Start by adding some!</p>
        ) : (
          flashcards.map((card, index) => (
            <div key={index} className="flashcard">
              <h3 className="flashcard-question">Q: {card.question}</h3>
              <p className="flashcard-answer">A: {card.answer}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
