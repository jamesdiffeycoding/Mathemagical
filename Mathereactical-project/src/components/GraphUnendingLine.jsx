import React, { useState, useEffect, useRef } from 'react';
import './graph.css';
import { coloursArray } from './rainbowhelper';

export default function GraphUnendingLine({ title }) {
  const canvasRef = useRef(null);
  const [theta, setTheta] = useState(0);
  const [thetaLimit, setThetaLimit] = useState(1000);
  const [thetaIncrement, setThetaIncrement] = useState(0.0004);
  const [lineThickness, setLineThickness] = useState(1);
  const [graphColor, setGraphColor] = useState('#ffffff');
  const [colorIndex, setColorIndex] = useState(0);
  const [rainbowMode, setRainbowMode] = useState(false)
  const [colorCount, setColorCount] = useState(0)
  const [canvasBackground, setCanvasBackground]= useState('rgb(0, 36, 66)')
  const [renderSpeed, setRenderSpeed] = useState(50);
  function handleIncrementChange (newIncrement) {
    setThetaIncrement(newIncrement);
  }



  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    let animationFrameId;

    function drawNextFrame() {
      const realPart = Math.cos(theta) + Math.cos(Math.PI * theta);
      const imagPart = Math.sin(theta) + Math.sin(Math.PI * theta);
      const x = centerX + realPart * 80;
      const y = centerY + imagPart * 80;
      ctx.beginPath();
      ctx.arc(x, y, lineThickness, 0, 2 * Math.PI);
      
      //  rainbow colour augmentation if mode turned on
      if(rainbowMode ){
        let newColour = `rgb(${coloursArray[colorIndex][0]}, ${coloursArray[colorIndex][1]}, ${coloursArray[colorIndex][2]})`
        setGraphColor(newColour)    
        // count should increase by 1 every time, resetting to 0 when it reaches 10
        // index should increase by 1 whenever count = 10 
        if (colorCount == 20) {
          setColorCount(0)
        if(colorIndex != coloursArray.length -1) {
          setColorIndex(colorIndex+1)
        } else {
          setColorIndex(0)
        }
      } else {
        setColorCount(colorCount + 1)
      }
    }
      ctx.fillStyle= graphColor
      ctx.fill();
      setTheta(theta + thetaIncrement);
    }
    drawNextFrame();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [theta, thetaLimit, lineThickness, graphColor, renderSpeed]);

  function resetColourToWhite () {
    setGraphColor('#ffffff')
  }
  function toggleRainbowMode () {
    if (rainbowMode) {
      setRainbowMode(false)
      resetColourToWhite()
    } else {
      setRainbowMode(true)
    }
  }
  function toggleBackground() {
    if (canvasBackground == 'rgb(0, 36, 66)') {
      setCanvasBackground('rgb(220, 220, 220)')
    } else {
      setCanvasBackground('rgb(0, 36, 66)')
    }
  }
  function handleRestartAnimation () {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reset theta to start the animation over
    setTheta(0);
};
  return (
    <div className="graph-container-item">
      <h2 className="graph-title codystar-regular">{title || "Graph name"}</h2>
      <canvas ref={canvasRef} className="graph-canvas" width={500} height={500} style={{backgroundColor: canvasBackground}}></canvas>
      <div className="section-container-centering">
        <div className="settings-container">
          <h3 className="subsection-heading codystar-light">Toggles</h3>

          <button onClick={() => toggleRainbowMode()}>{!rainbowMode ? ("Rainbow on"): ("Rainbow off")}</button>
          <button onClick={() => toggleBackground()}>{!canvasBackground === 'rgb(0, 36, 66)' ? ("Blue canvas"): ("White canvas")}</button>
          <div className="button-container">
          <br></br>
          <h3 className="subsection-heading codystar-light">Increment speed</h3>
            <button onClick={() => handleIncrementChange(0.00005)}>1</button>
            <button onClick={() => handleIncrementChange(0.0001)}>2</button>
            <button onClick={() => handleIncrementChange(0.0004)}>3</button>
            <button onClick={() => handleIncrementChange(0.0008)}>4</button>
            <button onClick={() => handleIncrementChange(0.0011)}>5</button>
            <button onClick={() => handleIncrementChange(0.0015)}>6</button>
            <button onClick={() => handleIncrementChange(0.004)}>7</button>
            <button onClick={() => handleIncrementChange(0.008)}>8</button>
          <button onClick={handleRestartAnimation}>Restart Animation</button>
          </div>


        </div>
      </div>  
      <section className="section-container-centering">
        <p className="graph-description">The equation Z(θ) = e^θi + e^(πθ)i represents a complex function that generates points in the complex plane based on the angle parameter θ. This equation combines exponential functions and imaginary numbers to create a visually captivating pattern of points that evolve as θ varies. </p>
      </section>
      <section className="section-container-centering">
        <div className="equations-container">
          <h3 className="subsection-heading codystar-light">Equations</h3>
          <p className="graph-equations">Z(θ) = e^θi + e^(πθ)</p>
          <p className="graph-equations">x = cos(θ) + cos(πθ)</p>
          <p className="graph-equations">y = sin(θ) + sin(πθ)</p>
        </div>
      </section>

    </div>
  );}