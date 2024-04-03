import { useState } from 'react'
import './App.css'
import Graph from './components/Graph.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>    
        <Header></Header>    
        <hr></hr>

        <Graph></Graph>
        <hr></hr>
        <Footer></Footer>
        <hr></hr>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
