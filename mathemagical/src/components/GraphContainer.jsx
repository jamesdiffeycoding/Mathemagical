import React, { useState, useEffect} from 'react';
import Graph from './Graph';
import GraphUnendingLine from './GraphUnendingLine';
import './graphcontainer.css'


export default function GraphContainer() {

  
  return (
    <>
    <hr></hr>
      <div className="graph-container-grid">
        <GraphUnendingLine title={'"The unending line"'}></GraphUnendingLine>
        <Graph title={'Coming soon'}></Graph>
        {/* <Graph title={'"The unending line"'}></Graph> */}
        {/* <Graph title={'"The unending line"'}></Graph> */}
      </div> 

    </>


  );
}