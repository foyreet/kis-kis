import React, { useState } from 'react';
import Board from './components/Board';
import PlayerPanel from './components/PlayerPanel';
import PopupModal from './components/PopupModal';
import useGameState from './hooks/useGameState';
import { Zap } from 'lucide-react';

function App() {
  const { gameState, rollDice, changeAvatar, closePopup } = useGameState();
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });

  const handleBoardResize = (width: number, height: number) => {
    setBoardSize({ width, height });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-yellow-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Energy Quest</h1>
          </div>
          <div className="flex items-center">
            <div className="bg-indigo-100 rounded-full px-3 py-1 text-sm font-medium text-indigo-800">
              Player Level: {gameState.player.level}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Game board section */}
          <div className="flex-grow lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-4 h-[600px]">
              <Board 
                cells={gameState.cells} 
                playerPosition={gameState.player.position} 
                onResize={handleBoardResize}
              />
            </div>
          </div>
          
          {/* Player panel section */}
          <div className="lg:w-1/3">
            <PlayerPanel 
              player={gameState.player} 
              message={gameState.message}
              onRollDice={rollDice}
              onAvatarChange={changeAvatar}
            />
          </div>
        </div>
      </main>
      
      {/* Popup modal */}
      <PopupModal 
        isOpen={gameState.showPopup}
        title={gameState.popupTitle}
        message={gameState.popupMessage}
        onClose={closePopup}
      />
    </div>
  );
}

export default App;