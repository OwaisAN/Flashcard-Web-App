import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function DeckDetail() {
  const { deckId } = useParams();
  const [decks, setDecks] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Load decks on mount
  useEffect(() => {
    const savedDecks = JSON.parse(localStorage.getItem('decks')) || [];
    setDecks(savedDecks);
  }, []);

  // Find or create temporary deck
  const currentDeck = decks.find(d => d.id === deckId) || { 
    id: deckId, 
    name: 'New Deck', 
    cards: [] 
  };

  const addCard = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    const newCard = {
      id: crypto.randomUUID(),
      question: question.trim(),
      answer: answer.trim()
    };

    const updatedDecks = decks.some(d => d.id === deckId)
      ? decks.map(deck => 
          deck.id === deckId 
            ? { ...deck, cards: [...deck.cards, newCard] } 
            : deck
        )
      : [...decks, { ...currentDeck, cards: [newCard] }];

    localStorage.setItem('decks', JSON.stringify(updatedDecks));
    setDecks(updatedDecks);
    setQuestion('');
    setAnswer('');
  };

  const deleteCard = (cardId) => {
    const updatedDecks = decks.map(deck =>
      deck.id === deckId
        ? { ...deck, cards: deck.cards.filter(card => card.id !== cardId) }
        : deck
    );
    localStorage.setItem('decks', JSON.stringify(updatedDecks));
    setDecks(updatedDecks);
  };

  return (
    <div className="app-container">
      <h2>{currentDeck.name} Cards</h2>
      
      {<form onSubmit={addCard} className="flashcard-form">
        {/* Keep your existing form elements */}
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter question"
          required
          rows="4"
          className='textarea-field'
        />
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter answer"
          required
          rows="4"
        />
        <button type="submit">Add Card</button>
      </form>
        }
      <div className="cards-list">
        {currentDeck.cards.length === 0 ? (
          <p className="empty-state">No cards in this deck yet. Add your first one!</p>
        ) : (
          currentDeck.cards.map(card => (
            <div key={card.id} className="flashcard">
              <h3>Q: {card.question}</h3>
              <p>A: {card.answer}</p>
              <button onClick={() => deleteCard(card.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}