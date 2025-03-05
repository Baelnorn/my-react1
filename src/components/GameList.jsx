import React from 'react';

const GameList = ({ games, screenshotIndices, currentScreenshot, deleteGame, setEditGame, sortBy, setSortBy, reverseOrder, setReverseOrder }) => {
  // Sort games based on sortBy and reverseOrder
  const sortedGames = [...games].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.Release);
      const dateB = new Date(b.Release);
      return reverseOrder ? dateA - dateB : dateB - dateA; // Newest to oldest default
    } else if (sortBy === 'rating') {
      return reverseOrder ? b.Rating - a.Rating : a.Rating - b.Rating; // Low to high default
    }
    return 0;
  });

  return (
    <>
      <h1>Games List ({games.length} games)</h1>
      <div className="controls">
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">By Date</option>
            <option value="rating">By Rating</option>
          </select>
        </label>
        <label>
          Reverse Order:
          <input
            type="checkbox"
            checked={reverseOrder}
            onChange={(e) => setReverseOrder(e.target.checked)}
          />
        </label>
        <button onClick={() => setEditGame(null)}>Add Game</button>
      </div>
      <div className="game-items">
        {sortedGames.map((game, index) => (
          <div key={index}>
            <div className="head">
              <div className="name">{game.id}</div>
              <div className="rating">{game.Rating}</div>
            </div>
            <div className="body">
              <div>
                <p>Date: {game.Release}</p>
                <p>Description: {game.Description}</p>
                <img
                  src="https://static.thenounproject.com/png/22190-512.png"
                  alt="edit"
                  className="edit_icon"
                  onClick={() => setEditGame(game)}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
                  alt="delete"
                  className="edit_icon"
                  onClick={() => deleteGame(game.id)}
                />
              </div>
              <div>
                {game.Screenshots && game.Screenshots.length > 0 ? (
                  <img src={currentScreenshot(game)} alt="Screenshot" />
                ) : (
                  <p>No screenshot available</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GameList;