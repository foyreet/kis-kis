import { useState, useEffect, useCallback } from 'react';
import { GameState, Player, Cell, CellType } from '../types/game.types';
import { generateBoard, getRandomCellType, getRandomMessage } from '../utils/board.utils';

const COOLDOWN_TIME = 5000; // 5 seconds in milliseconds

const initialPlayer: Player = {
  position: 0,
  level: 1,
  lastRollTime: 0,
  canRoll: true,
  avatarIndex: 0
};

const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: initialPlayer,
    cells: generateBoard(),
    message: "Welcome to Energy Quest! Roll the dice to begin your journey.",
    showPopup: false,
    popupMessage: "",
    popupTitle: ""
  });

  // Handle dice roll and player movement
  const rollDice = useCallback((value: number) => {
    setGameState(prevState => {
      // Calculate new position
      const newPosition = (prevState.player.position + value) % prevState.cells.length;
      
      // Update player state with new position and roll time
      const updatedPlayer = {
        ...prevState.player,
        position: newPosition,
        lastRollTime: Date.now(),
        canRoll: false
      };
      
      // Get the current cell
      const currentCell = prevState.cells[newPosition];
      
      // Apply cell effects
      let message = `You rolled a ${value} and landed on a`;
      let updatedCells = [...prevState.cells];
      let showPopup = false;
      let popupMessage = "";
      let popupTitle = "";
      let levelIncrease = 0;
      
      switch (currentCell.type) {
        case CellType.EMPTY:
          message += " blank cell. Nothing happens.";
          break;
          
        case CellType.EVENT:
          message += "n event cell!";
          showPopup = true;
          popupTitle = "Unexpected Event!";
          popupMessage = currentCell.message || "Something unexpected happened!";
          break;
          
        case CellType.BONUS:
          message += " bonus cell! +1 Level";
          levelIncrease = 1;
          break;
          
        case CellType.ACTION:
          message += "n action cell!";
          showPopup = true;
          popupTitle = "Special Promotion!";
          popupMessage = currentCell.message || "Check out this special offer!";
          break;
          
        case CellType.RISK:
          // Change to random cell type
          const newType = getRandomCellType();
          message += ` risk cell that changed to a ${newType} cell!`;
          
          // Update the cell with new type
          updatedCells = updatedCells.map(cell => 
            cell.id === currentCell.id 
              ? { ...cell, type: newType, message: getRandomMessage(newType) } 
              : cell
          );
          
          // Apply effects of the new cell type
          if (newType === CellType.BONUS) {
            message += " +1 Level";
            levelIncrease = 1;
          } else if (newType === CellType.EVENT || newType === CellType.ACTION) {
            showPopup = true;
            popupTitle = newType === CellType.EVENT ? "Unexpected Event!" : "Special Promotion!";
            popupMessage = getRandomMessage(newType);
          }
          break;
      }
      
      // Update player level if bonus
      const newLevel = prevState.player.level + levelIncrease;
      
      return {
        ...prevState,
        player: {
          ...updatedPlayer,
          level: newLevel
        },
        cells: updatedCells,
        message,
        showPopup,
        popupMessage,
        popupTitle
      };
    });
  }, []);

  // Change avatar
  const changeAvatar = useCallback((index: number) => {
    setGameState(prevState => ({
      ...prevState,
      player: {
        ...prevState.player,
        avatarIndex: index
      }
    }));
  }, []);

  // Close popup
  const closePopup = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      showPopup: false
    }));
  }, []);

  // Check cooldown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prevState => {
        const currentTime = Date.now();
        const timeElapsed = currentTime - prevState.player.lastRollTime;
        
        if (!prevState.player.canRoll && timeElapsed >= COOLDOWN_TIME) {
          return {
            ...prevState,
            player: {
              ...prevState.player,
              canRoll: true
            }
          };
        }
        return prevState;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return {
    gameState,
    rollDice,
    changeAvatar,
    closePopup
  };
};

export default useGameState;