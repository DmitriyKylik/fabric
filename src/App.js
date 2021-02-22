import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const App = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState('');
  const [objectList, setObjectList] = useState([]);
  const [robotoText, setRobotoText] = useState('');
  const [sansText, setSansText] = useState('');

  // TO DO Get updated canvas instance
  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'pink'
    })
  );

  const addRect = (canvInstance) => {
    const rect = new fabric.Rect({
      height: 200,
      width: 200,
      fill: 'yellow',
    });

    canvas.add(rect);

    // canvas.renderAll();
    setObjectList(canvas._objects);
  };

  const addCircle = (canvInstance) => {
    const circle = new fabric.Circle({
      radius: 80,
      fill: 'green',
    });

    canvas.add(circle);

    // canvas.renderAll();
    setObjectList(canvas._objects);
  };

  const addImage = (fileObj) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = () => {
        const image = new fabric.Image(imgObj, {
          left: 0,
          top: 0,
        });
        canvas.add(image);
        setObjectList(canvas._objects);
        // canvas.renderAll();
        fileObj.value = '';
      };
    };
    reader.readAsDataURL(fileObj.files[0]);
  };

  const addRobotoText = () => {
    const robotoTextInstance = new fabric.Text(robotoText, {
      fontFamily: 'Comic Sans',
      fontWeight: 'bold',
      fontSize: 24,
    });
    canvas.add(robotoTextInstance);
    setObjectList(canvas._objects);
  };

  const addSansText = () => {
    const sansTextInstance = new fabric.Text(sansText, {
      fontFamily: 'Helvetica'
    });
    canvas.add(sansTextInstance);
    setObjectList(...canvas._objects);
  };

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fabric.js on React - fabric.Canvas('...')</h1>
        <input type="file" name="image" onChange={(event) => addImage(event.target)} />
        <button onClick={addRect}>Rectangle</button>
        <button onClick={addCircle}>Circle</button>
        <div>
          <div>Roboto text</div>
          <input type="text" onChange={(event) => setRobotoText(event.target.value)} />
          <button onClick={addRobotoText}>Add roboto text</button>
        </div>
        <div>
          <div>Sans text</div>
          <input type="text" onChange={(event) => setSansText(event.target.value)} />
          <button onClick={addSansText}>Add sans text</button>
        </div>
        <div>
        {objectList.length > 0 ? (

            objectList.map((canvasItem, index) => {
                return (
                  <div key={`sdfsd${index}`}>{index + 1} Layer</div>
                );
            })
        ) : null}
        </div>
        <canvas ref={canvasRef} id="canvas" />
      </header>
    </div>
  );
}

export default App;
