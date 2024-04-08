// IMPORTS -------------------------------------------------------------------------------------------------------- 
import { useState, useEffect, useRef } from 'react';
import { coloursArray } from './rainbowRGBvalues';
import { global ,getAdjustedCanvasWidth, getAdjustedXYScalar, tweakParameterByPointTwo} from './helpers';
import './graph.css';




// COMPONENT -------------------------------------------------------------------------------------------------------- 
export default function GraphZThree() {
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
    
    // (3) RESPONSIVE SIZING -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      // ... STATE MANAGEMENT
      const [screenWidth, setScreenWidth] = useState(window.innerWidth)
      const [firstLoad, setFirstLoad] = useState(true)
      
      // ... FUNCTIONS
      function handleScreenResize () { 
        setScreenWidth(window.innerWidth)
      }  
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - -   
  // ⭐ UNIQUE SETUP CODE NOT SHARED WITH OTHER GRAPHS
    // (1) TWEAKING GRAPH PARAMETERS
      // ... STATE MANAGEMENT
      const [x1Mod, setX1Mod] = useState(1)
      const [x2Mod, setX2Mod] = useState(0)
      const [x3Mod, setX3Mod] = useState(0)
      const [x4Mod, setX4Mod] = useState(0)
      const [x5Mod, setX5Mod] = useState(0)
      const [x6Mod, setX6Mod] = useState(0)
      const [y1Mod, setY1Mod] = useState(0)
      const [y2Mod, setY2Mod] = useState(0)
      const [y3Mod, setY3Mod] = useState(1)
      const [y4Mod, setY4Mod] = useState(0)
      const [y5Mod, setY5Mod] = useState(0)
      const [y6Mod, setY6Mod] = useState(0)

      // ... FUNCTION
        // SCALAR MODIFICATION FUNCTION
        function handleCoefficientTweak(coefficient: string, direction: string) {
          switch (coefficient) {
            case "x1": setX1Mod(tweakParameterByPointTwo(x1Mod, direction)); break;
            case "x2": setX2Mod(tweakParameterByPointTwo(x2Mod, direction)); break;
            case "x3": setX3Mod(tweakParameterByPointTwo(x3Mod, direction)); break;
            case "x4": setX4Mod(tweakParameterByPointTwo(x4Mod, direction)); break;
            case "x5": setX5Mod(tweakParameterByPointTwo(x5Mod, direction)); break;
            case "x6": setX6Mod(tweakParameterByPointTwo(x6Mod, direction)); break;
            case "y1": setY1Mod(tweakParameterByPointTwo(y1Mod, direction)); break;
            case "y2": setY2Mod(tweakParameterByPointTwo(y2Mod, direction)); break;
            case "y3": setY3Mod(tweakParameterByPointTwo(y3Mod, direction)); break;
            case "y4": setY4Mod(tweakParameterByPointTwo(y4Mod, direction)); break;
            case "y5": setY5Mod(tweakParameterByPointTwo(y5Mod, direction)); break;
            case "y6": setY6Mod(tweakParameterByPointTwo(y6Mod, direction)); break;
            default: console.log("Invalid coefficient passed to handleCoefficientTweak"); break;
            }
          }

    // (2) TRACKING X AND Y COORDINATES FOR DISPLAY
      // ... STATE MANAGEMENT
      const [x, setX] = useState(0)
      const [y, setY] = useState(0)
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - -   

  
  // DRAW THE CANVAS _______________________________________________________
  useEffect(() => {
    const canvas = canvasRef.current;


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


    //@ts-expect-error canvas will be defined
    const ctx = canvas.getContext('2d');
    //@ts-expect-error canvas will be defined
    const centerX = canvas.width / 2;
    //@ts-expect-error canvas will be defined
      const centerY = canvas.height / 2;
    let animationFrameId: number;

    function drawNextFrame() {
      // X AND Y EQUATIONS _________________________________________________
      const realPart = x1Mod * (Math.sin(theta)) + x2Mod * (Math.sin(Math.PI*theta)) + x3Mod * (Math.cos(theta)) + x4Mod * (Math.cos(Math.PI*theta)) + x5Mod * (Math.tan(theta)) + x6Mod * (Math.tan(Math.PI*theta)) 
      const imagPart = y1Mod * (Math.sin(theta)) + y2Mod * (Math.sin(Math.PI*theta)) + y3Mod * (Math.cos(theta)) + y4Mod * (Math.cos(Math.PI*theta)) + y5Mod * (Math.tan(theta)) + y6Mod * (Math.tan(Math.PI*theta)) 
      const XYScalar: number = getAdjustedXYScalar(screenWidth)
      setX(centerX + realPart * XYScalar)
      setY(centerY + imagPart * XYScalar)
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
    };
  }, [screenWidth, firstLoad, x, y, colorCount, colorIndex, rainbowMode, theta, thetaIncrement, graphColor, x1Mod, x2Mod, x3Mod,x4Mod,x5Mod,x6Mod, y1Mod, y2Mod, y3Mod, y4Mod, y5Mod,y6Mod]);


  // COLOUR FUNCTIONS __________________________________________________________________________
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
  function handleColourChange (value: string) {
    setGraphColor(value)
    setRainbowMode(false)
  }
  

  // RESET FUNCTIONS ______________________________________________________________________________
  function handleRestartAnimation () {
    const canvas = canvasRef.current;
    //@ts-expect-error canvas will be defined
    const ctx = canvas.getContext('2d');
    // Clear the entire canvas
    //@ts-expect-error canvas will be defined
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTheta(0);
  }
  function handleResetToDefaults() {
    setThetaIncrement(0.0001);
    setColorIndex(0);
    setRainbowMode(true);
    setColorCount(0);
    setCanvasBackground(true);
    setX1Mod(1)
    setX2Mod(0)
    setX3Mod(0)
    setX4Mod(0)
    setX5Mod(0)
    setX6Mod(0)
    setY1Mod(1)
    setY2Mod(0)
    setY3Mod(0)
    setY4Mod(0)
    setY5Mod(0)
    setY6Mod(0)
    handleRestartAnimation()
  }



  return (
    <div className="graph-container-centering">
              <div className="graph-container-item makeyourown-border">
                <section className="makeyourown-grid">
                    <div className="makeyourown-grid-leftcol">


                                        <h2 className="graph-title codystar-regular makeyourown-title">Design your own</h2>
                                              <canvas
                                                ref={canvasRef}
                                                className="graph-canvas"
                                                width={500}
                                                height={500}
                                                style={{
                                                  backgroundColor: canvasBackground ? 'rgb(0, 36, 66)' : 'rgb(220, 220, 220)'
                                                }}
                                                ></canvas>
                                        <div>Theta: {theta.toFixed(2)}</div>
                                        <div>X: {((x-250)/80).toFixed(2)}</div>
                                        <div>Y:  {((y-250)/80).toFixed(2)}</div>

                                        {/* <div> {center}</div> */}

                        </div>
                        <div className="makeyourown-grid-rightcol">

                                  <div className="section-container-centering">
                                          <div className="settings-container">
                                            <h3 className="subsection-heading codystar-light">Scalar Modifications 🧑‍🔬</h3>
                                            <section className="scalar-equation">
                                              <div className="scalar-equation-item">
                                                <p>
                                                  x = <span className="scalar-decimals">{x1Mod.toFixed(1)}</span> * sin(θ) 
                                                  {x2Mod >= 0 ? ' + ' : ' - '}
                                                  <span className="scalar-decimals">{Math.abs(x2Mod).toFixed(1)}</span> * sin (πθ) 
                                                  {x3Mod >= 0 ? ' + ' : ' - '}
                                                  <span className="scalar-decimals">{Math.abs(x3Mod).toFixed(1)}</span> * cos(θ) 
                                                  {x4Mod >= 0 ? ' + ' : ' - '}
                                                  <span className="scalar-decimals">{Math.abs(x4Mod).toFixed(1)}</span> * cos(πθ) 
                                                  {x5Mod >= 0 ? ' + ' : ' - '}
                                                  <span className="scalar-decimals">{Math.abs(x5Mod).toFixed(1)}</span> * tan(θ) 
                                                  {x6Mod >= 0 ? ' + ' : ' - '}
                                                  <span className="scalar-decimals">{Math.abs(x6Mod).toFixed(1)}</span> * tan(πθ)
                                                </p>
                                              </div>
                                              <div className="scalar-equation-item">
                                                <p>
                                                  y = <span className="scalar-decimals">{y1Mod.toFixed(1)}</span> * sin(θ) 
                                                  {y2Mod >= 0 ? ' + ' : ' - '}
                                                  <span className="scalar-decimals">{Math.abs(y2Mod).toFixed(1)}</span> * sin (πθ) 
                                                  {y3Mod >= 0 ? ' + ' : ' - '}
                                                  <span className="scalar-decimals">{Math.abs(y3Mod).toFixed(1)}</span> * cos(θ) 
                                                  {y4Mod >= 0 ? ' + ' : ' - '}
                                                  <span className="scalar-decimals">{Math.abs(y4Mod).toFixed(1)}</span> * cos(πθ) 
                                                  {y5Mod >= 0 ? ' + ' : ' - '}
                                                  <span className="scalar-decimals">{Math.abs(y5Mod).toFixed(1)}</span> * tan(θ) 
                                                  {y6Mod >= 0 ? ' + ' : ' - '}
                                                  <span className="scalar-decimals">{Math.abs(y6Mod).toFixed(1)}</span> * tan(πθ)
                                                </p>
                                              </div>
                                              </section>


                                              <section className="scalar-container">
                                                <div className="scalar-column-left">
                                                  <h3>X</h3>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">sin(θ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x1", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x1", "decrease")}>+</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">sin(πθ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x2", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x2", "decrease")}>+</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">cos(θ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x3", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x3", "decrease")}>+</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">cos(πθ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x4", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x4", "decrease")}>+</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">tan(θ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x5", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x5", "decrease")}>+</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">tan(πθ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x6", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("x6", "decrease")}>+</button>
                                                  </div>
                                                </div>
                                                {/* Y BUTTONS */}
                                                <div className="scalar-column-right">
                                                <h3>Y</h3>

                                                  <div className="scalar-pair">
                                                    
                                                  <p className="scalar-tag">sin(θ)</p>
                                                  <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y1", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y1", "decrease")}>+</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                  <p className="scalar-tag">sin(πθ)</p>
                                                  <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y2", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y2", "decrease")}>+</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">cos(θ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y3", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y3", "decrease")}>+</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">cos(πθ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y4", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y4", "decrease")}>+</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">tan(θ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y5", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y5", "decrease")}>+</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">tan(πθ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y6", "increase")}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleCoefficientTweak("y6", "decrease")}>+</button>
                                                  </div>
                                                </div>

                                              </section>

                                              <br></br>
                                              <br></br>
                                            <h3 className="subsection-heading codystar-light">Colour toggles 🖌️</h3>
                                            <input type="color" onChange={(event) => handleColourChange((event.currentTarget as HTMLInputElement).value)} />
                                            <button className="graph-btn-gold" onClick={() => toggleRainbowMode()}>{rainbowMode ? ("Rainbow off"): ("Rainbow on")}</button>
                                            <button className="graph-btn-gold" onClick={() => toggleBackground()}>{canvasBackground === true? ("Blue canvas"): ("Grey canvas")}</button>

                                            <div className="button-container">
                                            <br></br>
                                            <h3 className="subsection-heading codystar-light">Increment speed ⏸️</h3>
                                            <button className="graph-btn-gold stop-button" onClick={() => handleThetaIncrement(0)}>S</button>
                                              <button className="graph-btn-gold" onClick={() => handleThetaIncrement(0.000001)}>1</button>
                                              <button className="graph-btn-gold" onClick={() => handleThetaIncrement(0.000005)}>2</button>
                                              <button className="graph-btn-gold" onClick={() => handleThetaIncrement(0.00005)}>3</button>
                                              <button className="graph-btn-gold" onClick={() => handleThetaIncrement(0.0001)}>4</button>
                                              <button className="graph-btn-gold" onClick={() => handleThetaIncrement(0.0004)}>5</button>
                                              <button className="graph-btn-gold" onClick={() => handleThetaIncrement(0.0008)}>6</button>
                                              <button className="graph-btn-gold" onClick={() => handleThetaIncrement(0.0011)}>7</button>
                                              <button className="graph-btn-gold" onClick={() => handleThetaIncrement(0.0015)}>8</button>
                                              <button className="graph-btn-gold" onClick={() => handleThetaIncrement(0.004)}>9</button>
                                              <button className="graph-btn-gold" onClick={() => handleThetaIncrement(0.008)}>10</button>
                                              <br></br>
                                              <br></br>
                                              <h3 className="subsection-heading codystar-light">Restart / reset 🔄</h3>
                                                <button className="graph-btn-gold" onClick={handleRestartAnimation}>Restart Animation</button>
                                                <button className="graph-btn-gold" onClick={handleResetToDefaults}>Reset to defaults</button>
                                            </div>
                                          </div>
                                        </div>  
                                        <section className="section-container-centering">
                                          {/* <p className="graph-description">The equation Z(θ) = e^θi + e^(πθ)i represents a complex function that generates points in the complex plane based on the angle parameter θ. This equation combines exponential functions and imaginary numbers to create a visually captivating pattern of points that evolve as θ varies. </p> */}
                                        </section>
                        </div>
                                </section>

              </div>
    </div>
  );}