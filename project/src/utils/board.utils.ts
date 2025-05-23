import { Cell, CellType } from "../types/game.types";

// Messages for different cell types
const eventMessages = [
  "Unexpected power outage in your area!",
  "Energy efficiency audit completed successfully!",
  "Solar panel installation delayed due to weather.",
  "Smart meter upgrade available for your home.",
  "Community energy project launched in your neighborhood!"
];

const actionMessages = [
  "Special offer: 15% discount on energy-efficient appliances!",
  "Promotion: Sign up for our green energy plan and get 2 months free!",
  "Use code ENERGYSAVE10 for 10% off your next bill!",
  "Refer a friend and both get $50 credit on your accounts!",
  "Limited time offer: Free home energy assessment!"
];

// Generate a random cell type
export const getRandomCellType = (): CellType => {
  const types = [CellType.EMPTY, CellType.EVENT, CellType.BONUS, CellType.ACTION];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
};

// Generate a random message based on cell type
export const getRandomMessage = (type: CellType): string => {
  if (type === CellType.EVENT) {
    return eventMessages[Math.floor(Math.random() * eventMessages.length)];
  } else if (type === CellType.ACTION) {
    return actionMessages[Math.floor(Math.random() * actionMessages.length)];
  }
  return "";
};

// Generate initial board with 50 cells
export const generateBoard = (): Cell[] => {
  const cells: Cell[] = [];
  const cellTypes = [CellType.EMPTY, CellType.EVENT, CellType.BONUS, CellType.ACTION, CellType.RISK];
  
  // Ensure a good distribution of cell types
  const typeCounts = {
    [CellType.EMPTY]: 20,
    [CellType.EVENT]: 10,
    [CellType.BONUS]: 8,
    [CellType.ACTION]: 8,
    [CellType.RISK]: 4
  };
  
  // Create cells with distributed types
  let cellId = 0;
  for (const [type, count] of Object.entries(typeCounts)) {
    for (let i = 0; i < count; i++) {
      cells.push({
        id: cellId++,
        type: type as CellType,
        message: getRandomMessage(type as CellType)
      });
    }
  }
  
  // Shuffle the cells
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  
  return cells;
};

// Calculate the path coordinates for each cell based on a curve
export const calculateBoardPath = (cellCount: number, containerWidth: number, containerHeight: number) => {
  const positions = [];
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  
  // Parameters to adjust the path shape
  const radiusX = containerWidth * 0.4;
  const radiusY = containerHeight * 0.35;
  const radiusVariation = 0.15; // How much the radius varies
  const angleOffset = 0.05; // Offset to create variation in angles
  
  for (let i = 0; i < cellCount; i++) {
    // Calculate angle based on position (0 to 2π)
    const baseAngle = (i / cellCount) * Math.PI * 2;
    
    // Add some variation to the angle
    const angle = baseAngle + (Math.sin(baseAngle * 3) * angleOffset);
    
    // Add some variation to the radius for a more natural path
    const radiusMultiplier = 1 + Math.sin(baseAngle * 4) * radiusVariation;
    
    // Calculate position on the ellipse
    const x = centerX + Math.cos(angle) * radiusX * radiusMultiplier;
    const y = centerY + Math.sin(angle) * radiusY * radiusMultiplier;
    
    positions.push({ x, y });
  }
  
  return positions;
};