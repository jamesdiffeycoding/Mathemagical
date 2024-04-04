import { useState, useEffect, useRef } from 'react';
import './graph.css';
import { coloursArray } from './rainbowhelper';

type GraphUnendingLineProps = {
  graphTitle: string;
};

export default function GraphUnendingLine({ graphTitle }: GraphUnendingLineProps) {
  const canvasRef = useRef(null);
  const [theta, setTheta] = useState(0);
  const lineThickness = 1
  const [thetaIncrement, setThetaIncrement] = useState(0.0004);
  const [graphColor, setGraphColor] = useState('#ffffff');
  const [colorIndex, setColorIndex] = useState(0);
  const [rainbowMode, setRainbowMode] = useState(false)
  const [colorCount, setColorCount] = useState(0)
  const [canvasBackground, setCanvasBackground]= useState(true)
  function handleIncrementChange (newIncrement: number) {
    setThetaIncrement(newIncrement);
  }



  useEffect(() => {
    const canvas = canvasRef.current;
    //@ts-expect-error canvas will be defined
    const ctx = canvas.getContext('2d');
    //@ts-expect-error canvas will be defined
    const centerX = canvas.width / 2;
    //@ts-expect-error canvas will be defined
      const centerY = canvas.height / 2;
    let animationFrameId: number;

    function drawNextFrame() {
      const realPart = Math.cos(theta) + Math.cos(Math.PI * theta);
      const imagPart = Math.sin(theta) + Math.sin(Math.PI * theta);
      const x = centerX + realPart * 80;
      const y = centerY + imagPart * 80;
      ctx.beginPath();
      ctx.arc(x, y, lineThickness, 0, 2 * Math.PI);
      
      //  rainbow colour augmentation if mode turned on
      if(rainbowMode){
        const newColour = `rgb(${coloursArray[colorIndex][0]}, ${coloursArray[colorIndex][1]}, ${coloursArray[colorIndex][2]})`
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
  }, [colorCount, colorIndex, rainbowMode, theta, thetaIncrement, graphColor]);

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
    if (canvasBackground == true) {
      setCanvasBackground(false)
    } else {
      setCanvasBackground(true)
    }
  }
  function handleRestartAnimation () {
    const canvas = canvasRef.current;
    //@ts-expect-error canvas will be defined
    const ctx = canvas.getContext('2d');
    
    // Clear the entire canvas
    //@ts-expect-error canvas will be defined
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reset theta to start the animation over
    setTheta(0);
}
  return (
    <div className="graph-container-item">
      <h2 className="graph-title codystar-regular">{graphTitle || "Graph name"}</h2>
      <canvas
  ref={canvasRef}
  className="graph-canvas"
  width={500}
  height={500}
  style={{
    backgroundColor: canvasBackground ? 'rgb(0, 36, 66)' : 'rgb(220, 220, 220)'
  }}
></canvas>      <div className="section-container-centering">
        <div className="settings-container">
          <h3 className="subsection-heading codystar-light">Toggles</h3>

          <button onClick={() => toggleRainbowMode()}>{rainbowMode ? ("Rainbow off"): ("Rainbow on")}</button>
          <button onClick={() => toggleBackground()}>{canvasBackground === true? ("Blue canvas"): ("White canvas")}</button>
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