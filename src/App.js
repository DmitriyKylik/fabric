import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const App = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [objectList, setObjectList] = useState([]);
  const [robotoText, setRobotoText] = useState('');
  const [sansText, setSansText] = useState('');
  console.log(objectList);
  // console.log(canvas?.getObjects());
  // console.log(canvasRef.current);
  // TO DO Get updated canvas instance


  // constant canvas properties
  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'pink'
    })
  );

  const addRect = (canvInstance, objectList) => {
    const rect = new fabric.Rect({
      height: 200,
      width: 200,
      fill: 'yellow',
    });

    canvas.add(rect);
    // console.log(canvas?.getObjects());
    // console.log(fabric);
    // canvas.renderAll();
    setObjectList(objectList => [...objectList, rect]);
  };

  const addCircle = (canvInstance) => {
    const circle = new fabric.Circle({
      radius: 80,
      fill: 'green',
    });

    // Reuse next two lines
    // move to the function addElement(circle)
    canvas.add(circle);
    setObjectList(objectList => [...objectList, circle]);
    // canvas.renderAll();
    // setObjectList(canvas._objects);
  };

  const addImage = (fileObj) => {
    const reader = new FileReader();

    // Better wrap in the promise
    reader.onload = (event) => {
      const imgObj = new Image();
      imgObj.src = event.target.result;
      // imgObj.onerror = need same action
      imgObj.onload = () => {
        const image = new fabric.Image(imgObj, {
          left: 0,
          top: 0,
        });
        canvas.add(image);
        fileObj.value = '';
        setObjectList(objectList => [...objectList, image]);
      };
    };
    // reader.onerror = need same action
    reader.readAsDataURL(fileObj.files[0]);
  };

  const addRobotoText = () => {
    const robotoTextInstance = new fabric.Text(robotoText, {
      fontFamily: 'Comic Sans',
      fontWeight: 'bold',
      fontSize: 24,
    });
    canvas.add(robotoTextInstance);
    setObjectList(objectList => [...objectList, robotoTextInstance]);
  };

  const addSansText = () => {
    const sansTextInstance = new fabric.Text(sansText, {
      fontFamily: 'Helvetica'
    });
    canvas.add(sansTextInstance);
    setObjectList(objectList => [...objectList, sansTextInstance]);
  };

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fabric.js on React - fabric.Canvas('...')</h1>
        <input type="file" name="image" onChange={(event) => addImage(event.target)} />
{/* Create base component button */}
        <button onClick={addRect}>Rectangle</button>
        <button onClick={addCircle}>Circle</button>
{/* Create component - <AddTextButton/> */}
        <div>
          <div>Roboto text</div>
         {/* Write pipeFunction -  <input type="text" onChange={pipeEventValue(setRobotoText)} />*/}
          <input type="text" onChange={(event) => setRobotoText(event.target.value)} />
          <button onClick={addRobotoText}>Add roboto text</button>
        </div>
{/* Reuse  <AddTextButton/> */}
        <div>
          <div>Sans text</div>
          <input type="text" onChange={(event) => setSansText(event.target.value)} />
          <button onClick={addSansText}>Add sans text</button>
        </div>
        <div>
        {
            objectList.map((canvasItem, index) => {
                return (
                  <div key={`sdfsd${index}`}>{index + 1} Layer</div>
                );
            })
        )}
        </div>
        <canvas ref={canvasRef} id="canvas" />
      </header>
    </div>
  );
}

export default App;
