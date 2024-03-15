import React, { useState, useEffect} from 'react';
import './App.css'; // Assuming you have your CSS file imported

function App() {
  const pointStyles = {
    width: '10px',
    height: '10px',
    backgroundColor: 'brown',
    borderRadius: '50%',
    position: 'absolute',
    color: 'blue'
  }
  const pointsArray= [{id: 0, x:"0",y: "0"},{id: 1, x:"50", y: "50"}, {id: 2, x:"100", y:"100"}]
  return (
    <>
      <div className='container'>
      {pointsArray.map((coordinates) => (
        <span key={coordinates.id} className='point' style={{marginLeft: `${coordinates.x}px`, marginBottom: `${coordinates.y}px`}}>{coordinates.id}</span>
      ))}
      </div> 

    </>


  );
}

export default App;
