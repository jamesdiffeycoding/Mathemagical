// IMPORTS -------------------------------------------------------------------------------------------------------- 
import { useState, useEffect, useRef } from 'react';
import { coloursArray } from './rainbowRGBvalues';
import { global, getAdjustedCanvasWidth, getAdjustedXYScalar} from './helpers';
import './graph.css';




// COMPONENT -------------------------------------------------------------------------------------------------------- 
export default function GraphOne() {
  // 🔗 SETUP CODE SHARED WITH OTHER GRAPHS- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    // (1) CANVAS -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
      // ... REFERENCE
      const canvasRef = useRef(null);

      // ... STATE MANAGEMENT
      const [theta, setTheta] = useState(0);
      const [thetaIncrement, setThetaIncrement] = useState(global.thetaInc);
      
      // ... FUNCTIONS
      function handleThetaIncrement (newIncrement: number) {
        setThetaIncrement(newIncrement);
      }

    // (2) COLOURS -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
      // ... STATE MANAGEMENT
      const [graphColor, setGraphColor] = useState('#ffffff');
      const [rainbowMode, setRainbowMode] = useState(false);
      const [colorIndex, setColorIndex] = useState(0);
      const [colorCount, setColorCount] = useState(0);
      const [canvasBackground, setCanvasBackground] = useState(true)
    
    // (3) RESPONSIVE SIZING -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
      // ... STATE MANAGEMENT
      const [screenWidth, setScreenWidth] = useState(window.innerWidth)
      const [firstLoad, setFirstLoad] = useState(true)
      
      // ... FUNCTIONS
      function handleScreenResize () { 
        setScreenWidth(window.innerWidth)
      }  
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - 


  // ⭐ UNIQUE SETUP CODE NOT SHARED WITH OTHER GRAPHS
    // NONE


    
    
    // 🔗 ⭐ USE EFFECT - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
      // (1) CANVAS REFERENCE 
      const canvas = canvasRef.current; //@ts-expect-error canvas will be defined
      const ctx = canvas.getContext('2d');

      // (2) GETTING SCREEN SIZE
      window.addEventListener('resize', handleScreenResize)
      window.addEventListener('orientationchange', handleScreenResize)
      
      // (3) ADJUSTING CANVAS WIDTH AND HEIGHT
      if (screenWidth !== window.innerWidth) { //@ts-expect-error canvas will be defined 
        canvas.width = getAdjustedCanvasWidth(screenWidth); //@ts-expect-error canvas will be defined
        canvas.height = canvas.width;
      }
      if(firstLoad) { //@ts-expect-error canvas will be defined
        canvas.width =getAdjustedCanvasWidth(screenWidth); //@ts-expect-error canvas will be defined
        canvas.height = canvas.width;
        setFirstLoad(false);
      }
      
      // (4) UPDATING CENTER POINT VALUES ON GRAPH
      //@ts-expect-error canvas will be defined
      const centerX = canvas.width / 2;
      //@ts-expect-error canvas will be defined
        const centerY = canvas.height / 2;


      // DRAW NEXT FRAME FUNCTION
      let animationFrameId: number;
      function drawNextFrame() {
        // ⭐ UNIQUE EQUATIONS
        const realPart = Math.cos(theta) + Math.cos(Math.PI * theta);
        const imagPart = Math.sin(theta) + Math.sin(Math.PI * theta);
        const XYScalar: number = getAdjustedXYScalar(screenWidth);
        const x = centerX + realPart * XYScalar;
        const y = centerY + imagPart * XYScalar;

        // INCREMENT THETA VALUE
        setTheta(theta + thetaIncrement);

        // LINE COLOURS
          // (1) CHANGE COLOUR STATE FOR RAINBOW MODE
          // logic: index increases every 20 refreshes
          if(rainbowMode){
            const newColour = `rgb(${coloursArray[colorIndex][0]}, ${coloursArray[colorIndex][1]}, ${coloursArray[colorIndex][2]})`
            setGraphColor(newColour);
            if (colorCount == 20) {
              setColorCount(0);
              if(colorIndex != coloursArray.length -1) {
                setColorIndex(colorIndex+1)} 
              else { setColorIndex(0); }
          } else { setColorCount(colorCount + 1) }
          }

          // (2) SPECIFY CHOSEN COLOUR AND DRAW LINE
          ctx.fillStyle= graphColor
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, y, global.lineThickness, 0, 2 * Math.PI);
        }
        drawNextFrame();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [firstLoad, screenWidth, colorCount, colorIndex, rainbowMode, theta, thetaIncrement, graphColor]);




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
function handleColourChange (value: string) {
  setGraphColor(value)
  setRainbowMode(false)
}



  return (
    <div className="graph-container-centering">
              <div className="graph-container-item">
                <h2 className="graph-title codystar-regular">"The unending line" {screenWidth}- {getAdjustedCanvasWidth(screenWidth)}</h2>
                      <canvas
                        ref={canvasRef}
                        className="graph-canvas"
                        width={500}
                        height={500}
                        style={{
                          backgroundColor: canvasBackground ? 'rgb(0, 36, 66)' : 'rgb(220, 220, 220)'
                        }}
                      ></canvas>      
          <div className="section-container-centering">
                  <div className="settings-container">
                  <h3 className="subsection-heading codystar-light">Colour toggles 🖌️</h3>

                <input type="color" onChange={(event) => handleColourChange((event.currentTarget as HTMLInputElement).value)} />
          <button className="graph-btn-blue" onClick={() => toggleRainbowMode()}>{rainbowMode ? ("Rainbow off"): ("Rainbow on")}</button>
          <button className="graph-btn-blue" onClick={() => toggleBackground()}>{canvasBackground === true? ("Blue canvas"): ("Grey canvas")}</button>
<div className="button-container">
                    <br></br>
                    <h3 className="subsection-heading codystar-light">Increment speed ⏸️ </h3>
                    <button className="graph-btn-blue stop-button" onClick={() => handleThetaIncrement(0)}>S</button>
                      <button className="graph-btn-blue" onClick={() => handleThetaIncrement(0.000001)}>1</button>
                      <button className="graph-btn-blue" onClick={() => handleThetaIncrement(0.000005)}>2</button>
                      <button className="graph-btn-blue" onClick={() => handleThetaIncrement(0.00005)}>3</button>
                      <button className="graph-btn-blue" onClick={() => handleThetaIncrement(0.0001)}>4</button>
                      <button className="graph-btn-blue" onClick={() => handleThetaIncrement(0.0004)}>5</button>
                      <button className="graph-btn-blue" onClick={() => handleThetaIncrement(0.0008)}>6</button>
                      <button className="graph-btn-blue" onClick={() => handleThetaIncrement(0.0011)}>7</button>
                      <button className="graph-btn-blue" onClick={() => handleThetaIncrement(0.0015)}>8</button>
                      <button className="graph-btn-blue" onClick={() => handleThetaIncrement(0.004)}>9</button>
                      <button className="graph-btn-blue" onClick={() => handleThetaIncrement(0.008)}>10</button>
                      <br></br>
                      <br></br>

                      <h3 className="subsection-heading codystar-light">Restart 🔄</h3>
                      <button className="graph-btn-blue" onClick={handleRestartAnimation}>Restart Animation</button>
                      
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
    </div>
  );}