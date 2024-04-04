import React, { useState, useEffect, useRef } from 'react';
import './graph.css';

export default function Graph({ title }) {
  const canvasRef = useRef(null);
  const [theta, setTheta] = useState(0);
  const [thetaLimit, setThetaLimit] = useState(1000);
  const [lineThickness, setLineThickness] = useState(1);
  const [graphColor, setGraphColor] = useState('#ffffff');
  const [renderSpeed, setRenderSpeed] = useState(50);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let animationFrameId;

    function drawNextFrame() {
      const realPart = Math.cos(theta) + Math.cos(Math.PI * theta);
      const imagPart = Math.sin(theta) + Math.sin(Math.PI * theta);
      const x = centerX + realPart * 80;
      const y = centerY + imagPart * 80;

      ctx.beginPath();
      ctx.arc(x, y, lineThickness, 0, 2 * Math.PI);
      ctx.fillStyle = graphColor;
      ctx.fill();

      setTheta(theta + 0.01);

      if (theta <= thetaLimit * Math.PI) {
        animationFrameId = requestAnimationFrame(drawNextFrame);
      }
    }

    drawNextFrame();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [theta, thetaLimit, lineThickness, graphColor, renderSpeed]);

  return (
    <div className="graph-container-item">
      <h2 className="graph-title codystar-regular">{title || "Graph name"}</h2>
      <canvas ref={canvasRef} className="graph-canvas" width={500} height={500}></canvas>
      <section className="section-container-centering">
      <p className="graph-description">More to come...</p>
      </section>

    </div>
    
  );}