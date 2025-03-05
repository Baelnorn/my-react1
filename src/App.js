import React, { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import db from './firebaseConfig';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import './App.css';

const App = () => {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState({
    id: '',
    Name: '',
    Rating: 0,
    Release: '',
    Description: '',
    Screenshots: [],
  });
  const [newScreenshot, setNewScreenshot] = useState('');
  const [view, setView] = useState('list');
  const [screenshotIndices, setScreenshotIndices] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [sortBy, setSortBy] = useState('date'); // New: 'date' or 'rating'
  const [reverseOrder, setReverseOrder] = useState(false); // New: true/false

  const fetchGames = async () => {
    try {
      const gamesCollection = collection(db, 'Gameslist');
      const snapshot = await getDocs(gamesCollection);
      const gameData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGames(gameData);
      setScreenshotIndices(gameData.reduce((acc, game) => {
        acc[game.id] = 0;
        return acc;
      }, {}));
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };
  
  const setEditGame = (game) => {
    if (game) {
      setCurrentGame(game);
      setIsEdit(true);
    } else {
      resetForm();
    }
    setView('form');
  };

  const deleteGame = async (id) => {
    try {
      await deleteDoc(doc(db, 'Gameslist', id));
      setGames(games.filter(game => game.id !== id));
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const saveGame = async (e) => {
    e.preventDefault();
    try {
      const gameData = { ...currentGame, id: currentGame.Name };
      await setDoc(doc(db, 'Gameslist', gameData.Name), gameData);
      setGames(prev => isEdit ? prev.map(g => g.id === gameData.id ? gameData : g) : [...prev, gameData]);
      resetForm();
      setView('list');
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };
  
  const resetForm = () => {
    setCurrentGame({
      id: '',
      Name: '',
      Rating: 0,
      Release: '',
      Description: '',
      Screenshots: [],
    });
    setNewScreenshot('');
    setIsEdit(false);
  };

  const currentScreenshot = (game) => {
    return game.Screenshots[screenshotIndices[game.id]];
  };

  const addScreenshot = () => {
    if (newScreenshot.trim()) {
      setCurrentGame(prev => ({
        ...prev,
        Screenshots: [...prev.Screenshots, newScreenshot.trim()],
      }));
      setNewScreenshot('');
    }
  };

  const editScreenshot = (index) => {
    const newUrl = prompt('Enter new URL:', currentGame.Screenshots[index]);
    if (newUrl) {
      setCurrentGame(prev => {
        const newScreenshots = [...prev.Screenshots];
        newScreenshots[index] = newUrl;
        return { ...prev, Screenshots: newScreenshots };
      });
    }
  };

  const deleteScreenshot = (index) => {
    setCurrentGame(prev => ({
      ...prev,
      Screenshots: prev.Screenshots.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScreenshotIndices(prev => {
        const newIndices = { ...prev };
        games.forEach(game => {
          if (game.Screenshots && game.Screenshots.length > 1) {
            newIndices[game.id] = (newIndices[game.id] + 1) % game.Screenshots.length;
          }
        });
        return newIndices;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [games]);

  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <GameList
            games={games}
            screenshotIndices={screenshotIndices}
            currentScreenshot={currentScreenshot}
            deleteGame={deleteGame}
            setEditGame={setEditGame}
            sortBy={sortBy}              // New prop
            setSortBy={setSortBy}        // New prop
            reverseOrder={reverseOrder}  // New prop
            setReverseOrder={setReverseOrder} // New prop
          />
        );
      case 'form':
        return (
          <GameForm
            currentGame={currentGame}
            setCurrentGame={setCurrentGame}
            newScreenshot={newScreenshot}
            setNewScreenshot={setNewScreenshot}
            isEdit={isEdit}
            saveGame={saveGame}
            addScreenshot={addScreenshot}
            editScreenshot={editScreenshot}
            deleteScreenshot={deleteScreenshot}
            cancelForm={() => { resetForm(); setView('list'); }}
          />
        );
      default:
        return <div>View not found</div>; // Fallback for unknown views
    }
  };

  return (
    <div id="app">
      {renderView()}
    </div>
  );
};

export default App;