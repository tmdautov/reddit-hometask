import './App.css';
import React, { useState } from 'react';
import myData from "./data/data.json";

import Grid from "./components/grid/Grid"
import Display from "./components/display/Display"


function App() {
  const [shapeState, setShapeState] = useState({});

  const onCellClick = (data) => {
    setShapeState(data)
  }
 
  return (
    <div className="App">
      <h1>Battleship game</h1>
      <div className="layout">
        <div className="item"><Display shapes={myData.layout} shipState={shapeState} shipTypes={myData.shipTypes}></Display> </div>
        <div className="item"><Grid shapes={myData} handleClick={(data) => onCellClick(data)}></Grid></div>        
      </div>      
    </div>
  );
}

export default App;
