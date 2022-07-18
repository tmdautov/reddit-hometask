import './Grid.css';
import React, { useState } from 'react';

function Grid(props) {
  const initBoard = new Array(10).fill(null).map((_, i) =>
    new Array(10).fill(null).map((_, j) => {
      // Place ships on their positions according do given json data
      const ship = props.shapes.layout.find((ship) => ship.positions.some((pos) => pos[0] === j && pos[1] === i));
      console.log(ship)

      return { ship, isHit: false };
    })
  );

  const [board, setBoard] = useState(initBoard);

  const onCellClick = (row, col) => {

    const newBoard = [...board];
    newBoard[row][col].isHit = true;
    setBoard(newBoard);

    const shipTypes = props.shapes.shipTypes;
    const ships = Object.keys(shipTypes);

    // Count ship state (number of hits per ship)
    let shipState = {};
    const layout = Object.assign({}, ...props.shapes.layout.map((ship) => ({ [ship.ship]: ship.positions })));
    for (const ship of ships) {
      const pos = layout[ship];
      const numberOfHits = pos.reduce((numberOfHits, pos) => (board[pos[1]][pos[0]].isHit ? numberOfHits + 1 : numberOfHits), 0);
      shipState[ship] = {
        hits: numberOfHits,
      };
    }

    // Is game finished?
    const typeNames = Object.keys(shipTypes);
    const isAliveShipsExist = typeNames.some((type) => shipTypes[type].size !== shipState[type].hits);
    if (!isAliveShipsExist) {
      alert('Game is finished')
    }  

    props.handleClick(shipState);
  };

  return (
    <div className='board'>
      {board?.map((row, i) => (
        <div key={i} className='board-row'>
          {row?.map((cell, j) => {
            const isShip = cell.ship;
            const hitClass = isShip ? 'board-cell--hit' : 'board-cell--miss';

            return (
              <div
                key={`${i}-${j}`}
                onClick={() => onCellClick(i, j)}
                className={`board-cell ${cell.isHit ? hitClass : ''}`}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Grid;
