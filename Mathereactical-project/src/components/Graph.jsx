import React, { useState, useEffect} from 'react';
import './graph.css'
export default function Graph({title}) {

  return (
    <>
      <div className="graph-container-item">
        <h2>{title || "Graph name"}</h2>
        <div className="graph-canvas"></div>
        <p class="graph-description">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.</p>
      </div> 

    </>


  );
}