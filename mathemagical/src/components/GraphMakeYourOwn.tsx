import { useState, useEffect, useRef } from 'react';
import './graph.css';
import { coloursArray } from './rainbowhelper';
import { screenSizeVariables,getAdjustedCanvasWidth, getAdjustedXYScalar} from './screensizescalars';

type GraphMakeYourOwnProps = {
  graphTitle: string;
};

export default function GraphMakeYourOwn({ graphTitle }: GraphMakeYourOwnProps) {
  const canvasRef = useRef(null);
  const [theta, setTheta] = useState(0);
  const lineThickness = 1
  const [thetaIncrement, setThetaIncrement] = useState(screenSizeVariables.thetaInc);
  const [graphColor, setGraphColor] = useState('#ffffff');
  const [colorIndex, setColorIndex] = useState(0);
  const [rainbowMode, setRainbowMode] = useState(true)
  const [colorCount, setColorCount] = useState(0)
  const [canvasBackground, setCanvasBackground]= useState(true)
  const [firstLoad, setFirstLoad] = useState(true)

  // COORDINATES
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  // SCREEN WIDTH
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth)
  function handleResize () { 
    setCanvasWidth(window.innerWidth)
  }

  
    

  // SCALAR MODIFICATIONS _______________________________________________
  const [x1Mod, setX1Mod] = useState(1)
  const [x2Mod, setX2Mod] = useState(0)
  const [x3Mod, setX3Mod] = useState(0)
  const [x4Mod, setX4Mod] = useState(0)
  const [x5Mod, setX5Mod] = useState(0)
  const [x6Mod, setX6Mod] = useState(0)
  const [y1Mod, setY1Mod] = useState(1)
  const [y2Mod, setY2Mod] = useState(0)
  const [y3Mod, setY3Mod] = useState(0)
  const [y4Mod, setY4Mod] = useState(0)
  const [y5Mod, setY5Mod] = useState(0)
  const [y6Mod, setY6Mod] = useState(0)
  
  
  // DRAW THE CANVAS _______________________________________________________
  useEffect(() => {
    const canvas = canvasRef.current;


    // MANIPULATE CANVAS WIDTH
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    if (canvasWidth !== window.innerWidth) {
      //@ts-expect-error canvas will be defined
      canvas.width = getAdjustedCanvasWidth(canvasWidth)
      //@ts-expect-error canvas will be defined
      canvas.height = canvas.width
    }
    if(firstLoad == true ) { 
      //@ts-expect-error canvas will be defined
      canvas.width =getAdjustedCanvasWidth(canvasWidth)
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
      const XYScalar: number = getAdjustedXYScalar(canvasWidth)
      setX(centerX + realPart * XYScalar)
      setY(centerY + imagPart * XYScalar)
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
  }, [canvasWidth, firstLoad, x, y, colorCount, colorIndex, rainbowMode, theta, thetaIncrement, graphColor, x1Mod, x2Mod, x3Mod,x4Mod,x5Mod,x6Mod, y1Mod, y2Mod, y3Mod, y4Mod, y5Mod,y6Mod]);



  // FUNCTIONS _________________________________________________________________________________
  // SCALAR MODIFICATION FUNCTIONS
  function handleX1ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && x1Mod<=2) {
      setX1Mod(prevValue => prevValue + 0.1)
    } else if (x1Mod == 2) {
      // do nothing
    } else {
      if (x1Mod >= -1.91)
        setX1Mod(prevValue => prevValue - 0.1);
    }
  }
  function handleX2ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && x2Mod<=2) {
      setX2Mod(prevValue => prevValue + 0.1)
    } else if (x2Mod == 2) {
      // do nothing
    } else {
      if (x2Mod >= -1.91)
        setX2Mod(prevValue => prevValue - 0.1);
    }
  }
  function handleX3ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && x3Mod <= 2) {
      setX3Mod(prevValue => prevValue + 0.1);
    } else if (x3Mod === 2) {
      // do nothing
    } else {
      if (x3Mod >= -1.91)
        setX3Mod(prevValue => prevValue - 0.1);
    }
  }
  function handleX4ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && x4Mod <= 2) {
      setX4Mod(prevValue => prevValue + 0.1);
    } else if (x4Mod === 2) {
      // do nothing
    } else {
      if (x4Mod >= -1.91)
        setX4Mod(prevValue => prevValue - 0.1);
    }
  }
  function handleX5ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && x5Mod <= 2) {
      setX5Mod(prevValue => prevValue + 0.1);
    } else if (x5Mod === 2) {
      // do nothing
    } else {
      if (x5Mod >= -1.91)
        setX5Mod(prevValue => prevValue - 0.1);
    }
  }
  function handleX6ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && x6Mod <= 2) {
      setX6Mod(prevValue => prevValue + 0.1);
    } else if (x6Mod === 2) {
      // do nothing
    } else {
      if (x6Mod >= -1.91)
        setX6Mod(prevValue => prevValue - 0.1);
    }
  }
  function handleY1ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && y1Mod <= 2) {
      setY1Mod(prevValue => prevValue + 0.1);
    } else if (y1Mod === 2) {
      // do nothing
    } else {
      if (y1Mod >= -1.91)
        setY1Mod(prevValue => prevValue - 0.1);
    }
  }
  function handleY2ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && y2Mod <= 2) {
      setY2Mod(prevValue => prevValue + 0.1);
    } else if (y2Mod === 2) {
      // do nothing
    } else {
      if (y2Mod >= -1.91)
        setY2Mod(prevValue => prevValue - 0.1);
    }
  }
  function handleY3ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && y3Mod <= 2) {
      setY3Mod(prevValue => prevValue + 0.1);
    } else if (y3Mod === 2) {
      // do nothing
    } else {
      if (y3Mod >= -1.91)
        setY3Mod(prevValue => prevValue - 0.1);
    }
  }
  function handleY4ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && y4Mod <= 2) {
      setY4Mod(prevValue => prevValue + 0.1);
    } else if (y4Mod === 2) {
      // do nothing
    } else {
      if (y4Mod >= -1.91)
        setY4Mod(prevValue => prevValue - 0.1);
    }
  }
  function handleY5ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && y5Mod <= 2) {
      setY5Mod(prevValue => prevValue + 0.1);
    } else if (y5Mod === 2) {
      // do nothing
    } else {
      if (y5Mod >= -1.91)
        setY5Mod(prevValue => prevValue - 0.1);
      }
  }
  function handleY6ChangeTrueUpFalseDown(direction: boolean) {
    if (direction && y6Mod <= 2) {
      setY6Mod(prevValue => prevValue + 0.1);
    } else if (y6Mod === 2) {
      // do nothing
    } else {
      if (y6Mod >= -1.91)
      setY6Mod(prevValue => prevValue - 0.1);
    }
  }


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
  
  // SPEED FUNCTIONS ______________________________________________________________________________
  function handleIncrementChange (newIncrement: number) {
    setThetaIncrement(newIncrement);
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


                                        <h2 className="graph-title codystar-regular makeyourown-title">{graphTitle || "Graph name"}</h2>
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
                                                    <button className="graph-btn-gold" onClick={() => handleX1ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleX1ChangeTrueUpFalseDown(false)}>-</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">sin(πθ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleX2ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleX2ChangeTrueUpFalseDown(false)}>-</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">cos(θ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleX3ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleX3ChangeTrueUpFalseDown(false)}>-</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">cos(πθ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleX4ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleX4ChangeTrueUpFalseDown(false)}>-</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">tan(θ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleX5ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleX5ChangeTrueUpFalseDown(false)}>-</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">tan(πθ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleX6ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleX6ChangeTrueUpFalseDown(false)}>-</button>
                                                  </div>
                                                </div>
                                                {/* Y BUTTONS */}
                                                <div className="scalar-column-right">
                                                <h3>Y</h3>

                                                  <div className="scalar-pair">
                                                    
                                                  <p className="scalar-tag">sin(θ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleY1ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleY1ChangeTrueUpFalseDown(false)}>-</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                  <p className="scalar-tag">sin(πθ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleY2ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleY2ChangeTrueUpFalseDown(false)}>-</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">cos(θ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleY3ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleY3ChangeTrueUpFalseDown(false)}>-</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">cos(πθ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleY4ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleY4ChangeTrueUpFalseDown(false)}>-</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">tan(θ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleY5ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleY5ChangeTrueUpFalseDown(false)}>-</button>
                                                  </div>
                                                  <div className="scalar-pair">
                                                    <p className="scalar-tag">tan(πθ)</p>
                                                    <button className="graph-btn-gold" onClick={() => handleY6ChangeTrueUpFalseDown(true)}>+</button>
                                                    <button className="graph-btn-gold" onClick={() => handleY6ChangeTrueUpFalseDown(false)}>-</button>
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
                                            <button className="graph-btn-gold stop-button" onClick={() => handleIncrementChange(0)}>S</button>
                                              <button className="graph-btn-gold" onClick={() => handleIncrementChange(0.000001)}>1</button>
                                              <button className="graph-btn-gold" onClick={() => handleIncrementChange(0.000005)}>2</button>
                                              <button className="graph-btn-gold" onClick={() => handleIncrementChange(0.00005)}>3</button>
                                              <button className="graph-btn-gold" onClick={() => handleIncrementChange(0.0001)}>4</button>
                                              <button className="graph-btn-gold" onClick={() => handleIncrementChange(0.0004)}>5</button>
                                              <button className="graph-btn-gold" onClick={() => handleIncrementChange(0.0008)}>6</button>
                                              <button className="graph-btn-gold" onClick={() => handleIncrementChange(0.0011)}>7</button>
                                              <button className="graph-btn-gold" onClick={() => handleIncrementChange(0.0015)}>8</button>
                                              <button className="graph-btn-gold" onClick={() => handleIncrementChange(0.004)}>9</button>
                                              <button className="graph-btn-gold" onClick={() => handleIncrementChange(0.008)}>10</button>
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