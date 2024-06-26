// IMPORTS -------------------------------------------------------------------------------------------------------- 
import { useState, useEffect, useRef } from 'react';
import { coloursArray } from './rainbowRGBvalues';
import { global, getAdjustedCanvasWidth, getAdjustedXYScalar} from './helpers';
import './graph.css';




// COMPONENT -------------------------------------------------------------------------------------------------------- 
export default function GraphTwo() {
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
    // (1) SCALE FACTOR -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
      // ... STATE MANAGEMENT
      const [xModification, setXModification] = useState(1.0)



    useEffect(() => {
    let canvas = canvasRef.current;
    let animationFrameId: number;

    // MANIPULATE CANVAS WIDTH
    window.addEventListener('resize', handleScreenResize)
    window.addEventListener('orientationchange', handleScreenResize)
    if (screenWidth !== window.innerWidth) {
      //@ts-expect-error canvas will be defined
      canvas.width = getAdjustedCanvasWidth(screenWidth)
      //@ts-expect-error canvas will be defined
      canvas.height = canvas.width
    }
    if(firstLoad == true ) { 
      //@ts-expect-error canvas will be defined
      canvas.width =getAdjustedCanvasWidth(screenWidth)
      //@ts-expect-error canvas will be defined
      canvas.height = canvas.width
      setFirstLoad(false)
    }

    canvas=canvasRef.current
    //@ts-expect-error canvas will be defined
    const ctx = canvas.getContext('2d');
    //@ts-expect-error canvas will be defined
    const centerX = canvas.width / 2;
    //@ts-expect-error canvas will be defined
    const centerY = canvas.height / 2;
    function drawNextFrame() {
      const realPart = xModification* Math.cos(theta) + Math.cos(Math.PI * theta);
      const imagPart = 1.8* Math.sin(theta) 
      const XYScalar: number = getAdjustedXYScalar(screenWidth)
      const x = centerX + realPart * XYScalar;
      const y = centerY + imagPart * XYScalar;
      ctx.beginPath();
      ctx.arc(x, y, global.lineThickness, 0, 2 * Math.PI);
      
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
      window.removeEventListener('resize', handleScreenResize)
    };
  }, [firstLoad, screenWidth, colorCount, colorIndex, rainbowMode, theta, thetaIncrement, graphColor, xModification]);

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
  function handleXModification (value: number) {
    setXModification(value)
  }
  function handleColourChange (value: string) {
    setGraphColor(value)
    setRainbowMode(false)
  }
  return (
    <div className="graph-container-centering">
              <div className="graph-container-item">
                <h2 className="graph-title codystar-regular">"What do you see?"</h2>
                      <canvas
                        ref={canvasRef}
                        className="graph-canvas"
                        id="mycanvas"
                        width={500}
                        height={500}
                        style={{
                          backgroundColor: canvasBackground ? 'rgb(0, 36, 66)' : 'rgb(220, 220, 220)'
                        }}
                      ></canvas>      
          <div className="section-container-centering">
                  <div className="settings-container">
                    <h3 className="subsection-heading codystar-light">Scalar Modification 🧑‍🔬</h3>
                      {/* <button className="graph-btn-blue" onClick={() => handleXModification(0)}>0</button> */}
                      <button className="graph-btn-blue" onClick={() => handleXModification(0.5)}>0.5</button>
                      {/* <button className="graph-btn-blue" onClick={() => handleXModification(1)}>1</button> */}
                      <button className="graph-btn-blue" onClick={() => handleXModification(1.5)}>1.5</button>
                      <br></br>
                      <br></br>
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


                      <h3 className="subsection-heading codystar-light">Restart / reset 🔄</h3>
                      <button className="graph-btn-blue" onClick={handleRestartAnimation}>Restart Animation</button>

                    </div>


                  </div>
                </div>  
                <section className="section-container-centering">
                  <p className="graph-description">Equations such as this can trigger our paridolic tendencies, inducing us to form images of objects even where there are none. What do you see when you look at the shape this graph makes? Try changing the scalar modification, which scales the graph horizontally. Does it change what you see?</p>
                </section>
                <section className="section-container-centering">
                  <div className="equations-container">
                    <h3 className="subsection-heading codystar-light">Equations</h3>
                    <p className="graph-equations">x = cos(θ) + cos(πθ)</p>
                    <p className="graph-equations">y = 1.8 sin(θ)</p>
                  </div>
                </section>

              </div>
    </div>
  );}