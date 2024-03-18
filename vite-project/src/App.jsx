import React, { useState, useEffect} from 'react';
import './App.css'; // Assuming you have your CSS file imported

function App() {


  // ---------------- Testing files -------------------------
  
  // Working array that is hard coded below \/\/\/\/\/\/\/\/\/\/
  // const hardCodedArray = [{id: 0, x:"0",y: "0"},{id: 1, x:"50", y: "50"}, {id: 2, x:"100", y:"100"}]
  let incrementXSpeed = 0.1
  let refreshRateInMs = 1
  // ---------------- Graph no.1: y=x -----------------------
  
  const styles = {
    border: '1px solid black';
  }
  const canvas = document.getElementById('complexCanvas');
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = 50; // Scale factor for visualizing

  function drawComplexFunction() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    
    // Loop through theta values to calculate Z(theta)
    for (let theta = 0; theta <= 2 * Math.PI; theta += 0.01) {
      const realPart = Math.cos(theta) + Math.cos(Math.PI * theta);
      const imagPart = Math.sin(theta) + Math.sin(Math.PI * theta);
      const x = centerX + realPart * scale;
      const y = centerY + imagPart * scale;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = 'blue';
    ctx.stroke();
  }

  drawComplexFunction();

  return (
    <>
    <canvas id="complexCanvas" width="500" height="500"></canvas>
 
    </>


  );
}

export default App;
