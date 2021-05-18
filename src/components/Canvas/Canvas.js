import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const Canvas = ({ setCanvas, children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    setCanvas(new fabric.Canvas(canvasRef.current, {
      renderOnAddRemove: true,
      stateful: true,
      height: 400,
      width: 400,
      backgroundColor: 'pink',
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