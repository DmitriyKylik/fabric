import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const Canvas = ({ setCanvas, children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    setCanvas(new fabric.Canvas(canvasRef.current, {
      renderOnAddRemove: true,
      stateful: true,
      height: 600,
      width: 800,
      backgroundColor: '#f4f7fa',
    }));
  }, [setCanvas]);

  return (
    <div>
      <canvas ref={canvasRef} />
      {children}
    </div>
  );
};

export default Canvas;