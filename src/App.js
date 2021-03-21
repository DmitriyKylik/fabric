import React, { useState, useEffect } from 'react';
import Canvas from './components/Canvas/Canvas';
import { fabric } from 'fabric';
// import FontImage from './assets/img/Font_Choose.jpg';
// import Close from './assets/img/cancel.svg';
import closeImg from './assets/img/cancel.svg';
import { useFabric } from './hooks/useFabric';
// const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

const App = () => {
  // const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  return (
    <div className="App">
      <Canvas setCanvas={setCanvas}/>
      {/* <header className="App-header">
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
        <canvas ref={ref} width={300} height={200} />
      </header> */}
    </div>
  );
}

export default App;
