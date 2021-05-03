import React, { useEffect, useCallback } from 'react';
import { textBoxFactory } from '../../factories/factories';
import {useFabricObject} from '../../hooks/useFabricObject';
import {ReactComponent as ArrowUp} from '../../assets/img/arrow_up.svg';
import {ReactComponent as ArrowDown} from '../../assets/img/arrow_down.svg';

const Text = ({ onChange, onRemove, id, canvas, options, containerStyles, navButtonStyles, navButtonsWrapper }) => {
  const factory = useCallback(() => textBoxFactory(options), []);
  const textbox = useFabricObject(factory, canvas, id, options, onChange);
  // console.log(canvas);
  useEffect(() => {
    const update = () => {
      onChange(id, textbox?.toObject());
    };
    textbox?.on('changed', update);
  }, [textbox, id, onChange]);

  return (
    <div className={containerStyles} style={{order: canvas?.getObjects()?.indexOf(textbox)}}>
      {canvas?.getObjects()?.indexOf(textbox) + 1}) {textbox?.text}
      <div className={navButtonsWrapper}>
        <button
          className={navButtonStyles}
          onClick={() => {
            textbox?.sendBackwards(false);
            textbox.fire('moveDown');
        }}>
          <ArrowUp />
        </button>
        <button
          className={navButtonStyles}
          onClick={() => {
            textbox?.bringForward(false);
            textbox.fire('moveUp');
        }}>
          <ArrowDown />
        </button>
      </div>
      <button
        onClick={() => {
          canvas.remove(textbox)
          onRemove(id);
        }}
      >
        remove
      </button>
    </div>
  );
};

Text.defautlProps = {
  containerStyles: '',
  navButtonStyles: '',
  navButtonsWrapper: '',
};

export default Text;