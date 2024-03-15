import React, { useState, useEffect} from 'react';
import './App.css'; // Assuming you have your CSS file imported

function App() {


  // ---------------- Testing files -------------------------
  
  // Working array that is hard coded below \/\/\/\/\/\/\/\/\/\/
  // const hardCodedArray = [{id: 0, x:"0",y: "0"},{id: 1, x:"50", y: "50"}, {id: 2, x:"100", y:"100"}]
  let incrementXSpeed = 0.1
  let refreshRateInMs = 10
  // ---------------- Graph no.1: y=x -----------------------
  
  const [graphOnexValue, setGraphOneXValue] = useState(0)
  const [graphOneyValue, setGraphOneYValue] = useState(0)
  const [graphOneTrail, setGraphOneTrail] = useState([]); // Store the trail of previous positions
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphOneTrail(prevTrail => [...prevTrail, { x: graphOnexValue, y: graphOneyValue }]); // Add current position to trail

      setGraphOneXValue(prevX => {
        const newX = prevX + incrementXSpeed;
        return newX > 150 ? 0 : newX;
      });
      setGraphOneYValue(prevX => {
        const newX = prevX + incrementXSpeed;
        return newX > 150 ? 0 : newX;
      }); // Update equation1Y based on the updated equation1X
      clearInterval(interval);
    }, refreshRateInMs)}, [graphOneTrail]);

    const [neggraphOnexValue, setnegGraphOneXValue] = useState(0)
    const [neggraphOneyValue, setnegGraphOneYValue] = useState(0)
    const [neggraphOneTrail, setnegGraphOneTrail] = useState([]); // Store the trail of previous positions
    useEffect(() => {
      const interval = setInterval(() => {
        setnegGraphOneTrail(prevTrail => [...prevTrail, { x: neggraphOnexValue, y: neggraphOneyValue }]); // Add current position to trail
  
        setnegGraphOneXValue(prevX => {
          const newX = prevX - incrementXSpeed;
          return newX > 150 ? 0 : newX;
        });
        setnegGraphOneYValue(prevX => {
          const newX = prevX - incrementXSpeed;
          return newX > 150 ? 0 : newX;
        }); // Update equation1Y based on the updated equation1X
        clearInterval(interval);
      }, refreshRateInMs)}, [neggraphOneTrail]);

  // ---------------- Graph no.2: y=x2 / 10-----------------------
  
  const [graphTwoxValue, setGraphTwoXValue] = useState(0)
  const [graphTwoyValue, setGraphTwoYValue] = useState(0)
  const [graphTwoTrail, setGraphTwoTrail] = useState([]); // Store the trail of previous positions
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphTwoTrail(prevTrail => [...prevTrail, { x: graphTwoxValue, y: graphTwoyValue }]); // Add current position to trail

      setGraphTwoXValue(prevX => {
        const newX = prevX + incrementXSpeed;
        return newX > 150 ? 0 : newX;
      });
      setGraphTwoYValue(prevY => {
        const newY = graphTwoxValue*graphTwoxValue / 10
        return newY > 1500 ? 0 : newY;
      }); // Update equation1Y based on the updated equation1X
      console.log(graphTwoTrail)
      clearInterval(interval);
    }, refreshRateInMs)}, [graphTwoTrail]);


    const [neggraphTwoxValue, setnegGraphTwoXValue] = useState(0)
    const [neggraphTwoyValue, setnegGraphTwoYValue] = useState(0)
    const [neggraphTwoTrail, setnegGraphTwoTrail] = useState([]); // Store the trail of previous positions
    useEffect(() => {
      const interval = setInterval(() => {
        setnegGraphTwoTrail(prevTrail => [...prevTrail, { x: neggraphTwoxValue, y: neggraphTwoyValue }]); // Add current position to trail
  
        setnegGraphTwoXValue(prevX => {
          const newX = prevX - incrementXSpeed;
          return newX > 150 ? 0 : newX;
        });
        setnegGraphTwoYValue(prevY => {
          const newY = neggraphTwoxValue*neggraphTwoxValue / 10
          return newY > 1500 ? 0 : newY;
        }); // Update equation1Y based on the updated equation1X
        console.log(neggraphTwoTrail)
        clearInterval(interval);
      }, refreshRateInMs)}, [neggraphTwoTrail]);
  
  
      // ---------------- Graph no.3: y=x3 / 10-----------------------
  
  const [graphThreexValue, setGraphThreeXValue] = useState(0)
  const [graphThreeyValue, setGraphThreeYValue] = useState(0)
  const [graphThreeTrail, setGraphThreeTrail] = useState([]); // Store the trail of previous positions
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphThreeTrail(prevTrail => [...prevTrail, { x: graphThreexValue, y: graphThreeyValue }]); // Add current position to trail

      setGraphThreeXValue(prevX => {
        const newX = prevX + incrementXSpeed;
        return newX > 150 ? 0 : newX;
      });
      setGraphThreeYValue(prevY => {
        const newY = graphThreexValue*graphThreexValue*graphThreexValue / 10
        return newY > 1500 ? 0 : newY;
      }); // Update equation1Y based on the updated equation1X
      console.log(graphThreeTrail)
      clearInterval(interval);
    }, refreshRateInMs)}, [graphThreeTrail]);

    const [neggraphThreexValue, setneggraphThreeXValue] = useState(0)
    const [neggraphThreeyValue, setneggraphThreeYValue] = useState(0)
    const [neggraphThreeTrail, setneggraphThreeTrail] = useState([]); // Store the trail of previous positions
    useEffect(() => {
      const interval = setInterval(() => {
        setneggraphThreeTrail(prevTrail => [...prevTrail, { x: neggraphThreexValue, y: neggraphThreeyValue }]); // Add current position to trail
  
        setneggraphThreeXValue(prevX => {
          const newX = prevX + incrementXSpeed;
          return newX > 150 ? 0 : newX;
        });
        setneggraphThreeYValue(prevY => {
          const newY = neggraphThreexValue*neggraphThreexValue*neggraphThreexValue / 10
          return newY > 15000 ? 0 : newY;
        }); // Update equation1Y based on the updated equation1X
        clearInterval(interval);
      }, refreshRateInMs)}, [neggraphThreeTrail]);
  
  
      // ---------------- Graph no.4: y=200sin(0.1x)-----------------------
  
      const [graphfourxValue, setGraphfourXValue] = useState(0)
      const [graphfouryValue, setGraphfourYValue] = useState(0)
      const [graphfourTrail, setGraphfourTrail] = useState([]); // Store the trail of previous positions
      useEffect(() => {
        const interval = setInterval(() => {
          setGraphfourTrail(prevTrail => [...prevTrail, { x: graphfourxValue, y: graphfouryValue }]); // Add current position to trail
    
          setGraphfourXValue(prevX => {
            const newX = prevX + (incrementXSpeed/10);
            return newX > 150 ? 0 : newX;
          });
          setGraphfourYValue(prevY => {
            const newY = 200 * Math.sin(graphfourxValue/10)
            return newY > 1500 ? 0 : newY;
          }); // Update equation1Y based on the updated equation1X
          console.log(graphfourTrail)
          clearInterval(interval);
        }, refreshRateInMs)}, [graphfourTrail]);
    
        const [neggraphfourxValue, setneggraphfourXValue] = useState(0)
        const [neggraphfouryValue, setneggraphfourYValue] = useState(0)
        const [neggraphfourTrail, setneggraphfourTrail] = useState([]); // Store the trail of previous positions
        useEffect(() => {
          const interval = setInterval(() => {
            setneggraphfourTrail(prevTrail => [...prevTrail, { x: neggraphfourxValue, y: neggraphfouryValue }]); // Add current position to trail
      
            setneggraphfourXValue(prevX => {
              const newX = prevX - (incrementXSpeed/10);
              return newX > 150 ? 0 : newX;
            });
            setneggraphfourYValue(prevY => {
              const newY = 200*  Math.sin(neggraphfourxValue/10)
              return newY > 1500 ? 0 : newY;
            }); // Update equation1Y based on the updated equation1X
            clearInterval(interval);
          }, refreshRateInMs)}, [neggraphfourTrail]);
      
      

  return (
    <>
      <div className='container'>
      {graphOneTrail.map((coordinates) => (
        <span key={coordinates.id} className='point graphone' style={{marginLeft: `${coordinates.x}px`, marginBottom: `${coordinates.y}px`}}>{coordinates.id}</span>
      ))}
      {neggraphOneTrail.map((coordinates) => (
        <span key={coordinates.id} className='point graphone' style={{marginLeft: `${coordinates.x}px`, marginBottom: `${coordinates.y}px`}}>{coordinates.id}</span>
      ))}
      {graphTwoTrail.map((coordinates) => (
        <span key={coordinates.id} className='point graphtwo' style={{marginLeft: `${coordinates.x}px`, marginBottom: `${coordinates.y}px`}}>{coordinates.id}</span>
      ))}
      {neggraphTwoTrail.map((coordinates) => (
        <span key={coordinates.id} className='point graphtwo' style={{marginLeft: `${coordinates.x}px`, marginBottom: `${coordinates.y}px`}}>{coordinates.id}</span>
      ))}
      {graphThreeTrail.map((coordinates) => (
        <span key={coordinates.id} className='point graphthree' style={{marginLeft: `${coordinates.x}px`, marginBottom: `${coordinates.y}px`}}>{coordinates.id}</span>
      ))}
      {neggraphThreeTrail.map((coordinates) => (
        <span key={coordinates.id} className='point graphthree' style={{marginLeft: `${coordinates.x}px`, marginBottom: `${coordinates.y}px`}}>{coordinates.id}</span>
      ))}
      {graphfourTrail.map((coordinates) => (
        <span key={coordinates.id} className='point graphfour' style={{marginLeft: `${coordinates.x}px`, marginBottom: `${coordinates.y}px`}}>{coordinates.id}</span>
      ))}
      {neggraphfourTrail.map((coordinates) => (
        <span key={coordinates.id} className='point graphfour' style={{marginLeft: `${coordinates.x}px`, marginBottom: `${coordinates.y}px`}}>{coordinates.id}</span>
      ))}
      </div> 

    </>


  );
}

export default App;
