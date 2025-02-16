import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function DeckManager() {
  const [decks, setDecks] = useState([]);
  const [newDeckName, setNewDeckName] = useState('');

  // Load decks from localStorage
  useEffect(() => {
    const savedDecks = JSON.parse(localStorage.getItem('decks')) || [];
    setDecks(savedDecks);
  }, []);

  const createDeck = (e) => {
    e.preventDefault();
    if (!newDeckName.trim()) return; // prevents empty deck names

    const newDeck = {
      id: crypto.randomUUID(), // Modern browser API
      name: newDeckName,
      cards: []
    };
    const updatedDecks = [...decks, newDeck];
    localStorage.setItem('decks', JSON.stringify(updatedDecks));
    setDecks(updatedDecks);
    setNewDeckName('');
  };

  return (
    <div className="app-container">
      <h1>Your Library</h1>
      
      <form onSubmit={createDeck} className='deck-form'>
        <input
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          placeholder="New deck name"
          required
        />
        <button type="submit">Create Deck</button>
      </form>

      <div className="deck-grid">
        {decks.map(deck => (
          <Link to={`/review/${deck.id}`} key={deck.id} className='deck-card-link'>
            <div key={deck.id} className="deck-card">
                <h3>{deck.name}</h3>
                <p>{deck.cards.length} cards</p>
                <div className='deck-actions'>
                <Link to={`/deck/${deck.id}`} onClick={e => e.stopPropagation()}>Edit</Link>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}