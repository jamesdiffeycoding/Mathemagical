import React, { useState, useEffect} from 'react';
import Graph from './Graph';
import './graphcontainer.css'


export default function GraphContainer() {

  return (
    <>
      <div className="graph-container-grid">
        <Graph title={'"The unending line"'}></Graph>
        <Graph title={'"The even swirl"'}></Graph>
        <Graph title={'"The unending line"'}></Graph>
        <Graph title={'"The unending line"'}></Graph>
      </div> 

    </>


  );
}