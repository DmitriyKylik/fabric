import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {fabric} from 'fabric';
import Canvas from './components/Canvas/Canvas';
import Text from './components/Text/Text';
import Image from './components/Image/Image';
import { useFabricData } from './hooks/useFabricData';
import styles from './App.module.scss';
// import FontImage from './assets/img/Font_Choose.jpg';
// import Close from './assets/img/cancel.svg';
// import closeImg from './assets/img/cancel.svg';
// import { useFabric } from './hooks/useFabric';
// const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

// const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
// <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
//   <g>
//     <circle r="25" cy="25" cx="25" />
//   </g>
// </svg>`;
// const base64svg = `data:image/svg+xml;base64,${btoa(svg)}`;


const App = () => {
  const [canvas, setCanvas] = useState(null);
  const [robotoText, setRobotoText] = useState('');
  const [texts, onTextChange, onObjectRemove] = useFabricData({});
  // const [images, onImageChange] = useFabricData({
  //   '0': { left: 100, width: 50, height: 50, data: { src: base64svg } },
  // });
  const addRobotoText = () => {
    onTextChange(uuidv4(), {text: robotoText, fill: '#'+(Math.random()*0xFFFFFF<<0).toString(16), isActive: false});
  };

  const addImage = (file) => {

  };

  return (
    <div className="App">
      <div>
        <div>Roboto text</div>
        <input type="text" onChange={(event) => setRobotoText(event.target.value)} />
        <button onClick={addRobotoText}>Add roboto text</button>
      </div>
      <input type="file" name="image" onChange={(event) => addImage(event.target.files[0])} />
      <div className={`${styles.canvasContentContainer}`}>
        <Canvas setCanvas={setCanvas}>
        </Canvas>
        <div className={`${styles.canvasObjectsList} flex flex-col`}>
          {Object.entries(texts).map(([key, options], index) => {
            return (
              canvas &&
              <Text
                activeStyles={styles.active}
                containerStyles={styles.canvasObjectsListItem}
                navButtonStyles={styles.navButtons}
                navButtonsWrapper={styles.navButtonsWrapper}
                id={key}
                options={options}
                canvas={canvas}
                onRemove={onObjectRemove}
                onChange={onTextChange}
                key={key}
              />
            );
          })}
        </div>

        {/*{Object.entries(images).map(*/}
        {/*  ([key, options]) =>*/}
        {/*    canvas && <Image options={options} canvas={canvas} id={key} key={key} onChange={onImageChange} />,*/}
        {/*)}*/}

      </div>

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
