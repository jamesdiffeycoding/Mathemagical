import { useState } from 'react'
import './App.css'
import GraphContainer from './components/GraphContainer.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'

function App() {

  return (
    <>
      <div>    
        <Header></Header>    
        <hr></hr>
        <GraphContainer></GraphContainer>
        <hr></hr>
      </div>
    </>
  )
}

export default App
