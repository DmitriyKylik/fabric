import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Canvas from './components/Canvas/Canvas';
import Text from './components/Text/Text';
import Image from './components/Image/Image';
import Rect from './components/Figure/Figure';
import { useFabricData } from './hooks/useFabricData';
import styles from './App.module.scss';

const App = () => {
  const [canvas, setCanvas] = useState(null);
  const [robotoText, setRobotoText] = useState('');
  const [texts, onTextChange, onTextRemove] = useFabricData({});
  const [images, onImageChange, onImageRemove] = useFabricData({});
  const [figures, onFigureChange, onFigureRemove] = useFabricData({});

  const addRobotoText = () => {
    onTextChange(uuidv4(), {
      text: robotoText,
      fill: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
      isActive: false,
      visible: true,
      name: 'Layer',
    });
  };

  const addImage = (file) => {
    onImageChange(uuidv4(), {
      imageObject: file,
      top: 0,
      isActive: false,
      visible: true,
      name: 'Layer',
    });
  };

  const addRect = () => {
    onFigureChange(uuidv4(), {
      width: 100,
      height: 100,
      isActive: false,
      visible: true,
      name: 'Layer',
      fill: '#14a38b',
    });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="control-wrapper">
          <div className="text-input-wrapper">
            <div>Roboto text</div>
            <input className="input-common" type="text" onChange={(event) => setRobotoText(event.target.value)} />
            <button disabled={robotoText === ''} className="btn__common" onClick={addRobotoText}>Add roboto text</button>
          </div>
          <input type="file" name="image" onChange={(event) => addImage(event.target.files[0])} />
          <div className="figure-btns-wrapper">
            <button className="btn__common" onClick={addRect}>Add rectangle</button>
          </div>
        </div>
        <div className={`${styles.canvasContentContainer}`}>
          <Canvas setCanvas={setCanvas}>
          </Canvas>
          <div className={`${styles.canvasObjectsList} flex flex-col`}>
            {Object.entries(texts).map(([key, options], index) => (
              canvas &&
              <Text
                id={key}
                options={options}
                canvas={canvas}
                onRemove={onTextRemove}
                onChange={onTextChange}
                key={key}
              />
            ))}
            {Object.entries(images).map(
              ([key, options]) =>
                canvas &&
                <Image
                  options={options}
                  canvas={canvas} id={key}
                  key={key}
                  onChange={onImageChange}
                  onRemove={onImageRemove}
                />,
            )}
            {Object.entries(figures).map(
              ([key, options]) =>
                canvas &&
                <Rect
                  options={options}
                  canvas={canvas}
                  id={key}
                  key={key}
                  onChange={onFigureChange}
                  onRemove={onFigureRemove}
                />,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
