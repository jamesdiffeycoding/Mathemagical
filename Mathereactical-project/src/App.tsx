import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Graph from './components/Graph.jsx'
import Footer from './components/Footer.jsx'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Graph></Graph>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
