import React, { useState, useEffect} from 'react';
import reactLogo from '../assets/react.svg'
import './header.css'
export default function Header() {

  return (
    <section>
      <div className="header-grid">
        {/* 1 */}
        <div className="header-grid-item react-logo">
          <a href="https://github.com/jamesdiffeycoding" target="_blank"> <img src={reactLogo} className="logo react" alt="React logo" /> </a>
        </div>
        {/* 2 */}
        <div className="header-grid-item project-name codystar-regular">
          <h1 className="header-h1">MatheMagical</h1>
        </div>
        {/* 3 */}
        <div className="header-grid-item subtitle codystar-light">
          <p>
            Aesthetic Math
          </p>
        </div>
      </div>
    </section>
  );
}