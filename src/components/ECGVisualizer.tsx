
import { useState, useEffect, useRef } from "react";

const ECGVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    let animationFrameId: number;
    let x = 0;
    
    // ECG pattern points
    const drawECGPattern = (x: number) => {
      const height = canvas.height;
      const baseY = height / 2;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.beginPath();
      ctx.strokeStyle = '#f0f0f0';
      
      // Vertical grid lines
      for (let i = 0; i <= canvas.width; i += 20) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
      }
      
      // Horizontal grid lines
      for (let i = 0; i <= height; i += 20) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
      }
      
      ctx.stroke();
      
      // Draw ECG line
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ea384c';
      
      const offset = x % 200;
      
      // Baseline
      ctx.moveTo(0, baseY);
      ctx.lineTo(offset > 10 ? 10 : offset, baseY);
      
      // P wave
      if (offset > 10) {
        ctx.quadraticCurveTo(
          15, baseY - 5,
          20, baseY
        );
      }
      
      // PR segment
      if (offset > 20) {
        ctx.lineTo(offset > 40 ? 40 : offset, baseY);
      }
      
      // QRS complex
      if (offset > 40) {
        ctx.lineTo(offset > 45 ? 45 : offset, baseY + 5); // Q
        ctx.lineTo(offset > 50 ? 50 : offset, baseY - 30); // R
        ctx.lineTo(offset > 55 ? 55 : offset, baseY + 10); // S
      }
      
      // ST segment
      if (offset > 55) {
        ctx.lineTo(offset > 80 ? 80 : offset, baseY);
      }
      
      // T wave
      if (offset > 80) {
        ctx.quadraticCurveTo(
          95, baseY - 10,
          110, baseY
        );
      }
      
      // Baseline continuation
      if (offset > 110) {
        ctx.lineTo(offset > 200 ? 200 : offset, baseY);
      }
      
      ctx.stroke();
      
      // Repeat pattern
      if (isAnimating) {
        x += 1;
        animationFrameId = requestAnimationFrame(() => drawECGPattern(x));
      }
    };
    
    // Start or pause animation
    if (isAnimating) {
      animationFrameId = requestAnimationFrame(() => drawECGPattern(x));
    } else if (canvas) {
      drawECGPattern(0);
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimating]);
  
  const toggleAnimation = () => {
    setIsAnimating(prev => !prev);
  };

  return (
    <div className="w-full">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">ECG Visualization</h3>
        <div className="relative bg-gray-50 border rounded-md">
          <canvas 
            ref={canvasRef} 
            className="w-full h-40 md:h-60"
          ></canvas>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <button 
            onClick={toggleAnimation} 
            className="bg-medical-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
          >
            {isAnimating ? (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pause ECG
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start ECG
              </>
            )}
          </button>
          <div className="text-xs text-gray-500">
            Normal Sinus Rhythm
          </div>
        </div>
      </div>
    </div>
  );
};

export default ECGVisualizer;
