import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { fabric } from 'fabric';
// import FontImage from './assets/img/Font_Choose.jpg';
// import Close from './assets/img/cancel.svg';
import closeImg from './assets/img/cancel.svg';
import { useFabric } from './hooks/useFabric';
// const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

const App_default = () => {
  // const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [objectList, setObjectList] = useState([]);
  const [robotoText, setRobotoText] = useState('');
  const [sansText, setSansText] = useState('');

  const ref = useFabric((fabricCanvas) => {
    console.log(fabricCanvas)
  });

    // console.log(canvas);
   function renderIcon(ctx, left, top, styleOverride, fabricObject) {

    const imageObj = new Image();
    imageObj.src = closeImg;
    const size = this.cornerSize;

    imageObj.onload = function() {
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(this, -size/2, -size/2, size, size);
      ctx.restore();
    };
  }

  const deleteObject = (eventData, transform) => {
    console.log(transform);
		const target = transform.target;
		const canvas = target.canvas;
    // console.log(target.hasOwnProperty('canvas'));
    // console.log(target);
    // console.log(canvas);
    canvas.remove(target);
    canvas.requestRenderAll();
	}

  // TO DO Get updated canvas instance
  const initCanvas = () => {

    // var img = document.createElement('img');
    // img.src = deleteIcon;

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon,
      cornerSize: 24
    });

    return new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'pink'
    });
  };

  const addRect = (canvInstance, objectList) => {
    const rect = new fabric.Rect({
      height: 200,
      width: 200,
      fill: 'yellow',
    });

    canvas.add(rect);
    setObjectList(objectList => [...objectList, rect]);
  };

  const addCircle = (canvInstance) => {
    const circle = new fabric.Circle({
      radius: 80,
      fill: 'green',
    });

    canvas.add(circle);
    setObjectList(objectList => [...objectList, circle]);
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
        fileObj.value = '';
        setObjectList(objectList => [...objectList, image]);
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
        {/*<canvas ref={ref} width={300} height={200} />*/}
         <canvas id="canvas" />
      </header>
    </div>
  );
}

export default App_default;
