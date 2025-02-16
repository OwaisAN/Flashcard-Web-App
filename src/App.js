import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import AddCards from './components/AddCards';
import ReviewCards from './components/ReviewCards';
import DeckManager from './components/DeckManager';
import './App.css';
import DeckDetail from './components/DeckDetail';




function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  
  return (
    <Router>
      <div>
        <div className={`sidebar ${isSideBarOpen ? "open" : "minimized"}`}>
          <button className='toggle-btn' onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            {isSideBarOpen ? "<" : ">"}
          </button>
          {isSideBarOpen && (
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/decks">Decks</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/decks">Decks</Link></li>
              </ul>
            </nav>
          )}
          
        </div>
        <Routes>
        <Route path="/" element={<DeckManager />} />
        <Route path="/review/:deckId" element={<ReviewCards />} />
        <Route path="/deck/:deckId" element={<DeckDetail />} />

      </Routes>
      </div>
    

      
    </Router>
  );
}


export default App;