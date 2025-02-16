import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ReviewCards() {
  const { deckId } = useParams();
  const [decks, setDecks] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flippedCardIndex, setFlippedCardIndex] = useState(null);

  // Load all decks
  useEffect(() => {
    try {
        const savedDecks = JSON.parse(localStorage.getItem('decks')) || [];
        setDecks(savedDecks);
    } catch (error) {
        console.error("Failed to load flashcards from localStorage:", error);
    }
  }, []);


  useEffect(() => {
    if (decks.length > 0) {
        const currentDeck = decks.find(deck => deckId === deck.id);
        if (currentDeck) {
            setFlashcards(currentDeck.cards || []);
        }
    }
  }, [decks, deckId]);






  const goToNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleFlip = () => {
    setFlippedCardIndex(flippedCardIndex === currentCardIndex ? null : currentCardIndex);
  };

  return (
    <div className="app-container">
      <h1 className="title">Review Flashcards</h1>
      {flashcards.length > 0 ? (
       <>
        <div className="flashcards-container">
          <div
            className={`flashcard ${
              flippedCardIndex === currentCardIndex ? 'flipped' : ''
            }`}
            onClick={handleFlip}
          >
            {/* Front of the card */}
            <div className="flashcard-front">
              <h3 className="flashcard-question">
                Q: {flashcards[currentCardIndex].question}
              </h3>
            </div>
            {/* Back of the card */}
            <div className="flashcard-back">
              <p className="flashcard-answer">
                A: {flashcards[currentCardIndex].answer}
              </p>
            </div>
          </div>
        </div>

        <div className="navigation-buttons">
            <button
              className="nav-button"
              onClick={goToPreviousCard}
              disabled={currentCardIndex === 0}
            >
              Previous
            </button>
            <button
              className="nav-button"
              onClick={goToNextCard}
              disabled={currentCardIndex === flashcards.length - 1}
            >
              Next
            </button>
          </div>
       </>
      ) : (
        <p>No flashcards available. Add some first!</p>
      )}
    </div>
  );
}
