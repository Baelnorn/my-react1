import React from 'react';

const GameForm = ({ currentGame, setCurrentGame, newScreenshot, setNewScreenshot, isEdit, saveGame, addScreenshot, editScreenshot, deleteScreenshot, cancelForm }) => (
  <div>
    <h1>{isEdit ? 'Edit' : 'Add'} Game</h1>
    <form onSubmit={saveGame}>
      <div className="submit_form">
        <div className="form-row">
          <label>Game Name:</label>
          <input
            value={currentGame.Name}
            onChange={(e) => setCurrentGame(prev => ({ ...prev, Name: e.target.value }))}
            required
          />
          <label>Score:</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={currentGame.Rating}
            onChange={(e) => setCurrentGame(prev => ({ ...prev, Rating: Number(e.target.value) }))}
            required
          />
          <label>Date:</label>
          <input
            type="date"
            value={currentGame.Release}
            onChange={(e) => setCurrentGame(prev => ({ ...prev, Release: e.target.value }))}
            required
          />
        </div>
        <div className="form-row">
          <label>Description:</label>
          <textarea
            value={currentGame.Description}
            onChange={(e) => setCurrentGame(prev => ({ ...prev, Description: e.target.value }))}
            required
          />
        </div>
        <div className="form-row">
          <label>Screenshots:</label>
          <input
            value={newScreenshot}
            onChange={(e) => setNewScreenshot(e.target.value)}
            placeholder="Enter screenshot URL"
          />
          <button type="button" onClick={addScreenshot}>Add Screenshot</button>
        </div>
        {currentGame.Screenshots.length > 0 && (
          <div className="form-row">
            <table className="screenshots">
              {currentGame.Screenshots.map((screenshot, index) => (
                <tr key={index}>
                  <td style={{ maxWidth: '600px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {screenshot}
                  </td>
                  <td><img src={screenshot} alt="Screenshot" /></td>
                  <td>
                    <img
                      src="https://static.thenounproject.com/png/22190-512.png"
                      alt="edit"
                      className="edit_icon"
                      onClick={() => editScreenshot(index)}
                    />
                  </td>
                  <td>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
                      alt="delete"
                      className="edit_icon"
                      onClick={() => deleteScreenshot(index)}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
        <div className="form-row">
          <button type="submit">Save</button>
          <button type="button" onClick={cancelForm}>Cancel</button>
        </div>
      </div>
    </form>
  </div>
);

export default GameForm;