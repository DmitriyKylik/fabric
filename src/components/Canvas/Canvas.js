import React, { useRef, useEffect} from 'react';
import fabric from 'fabric';

const Canvas = ({ setCanvas, children }) => {
  const canvasRef = useRef(null);


  useEffect(() => {
    setCanvas(new fabric.Canvas(canvasRef, {
      renderOnAddRemove: true,
    }));
  }, [setCanvas]);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      {children}
    </>
  );
};

export default Canvas;