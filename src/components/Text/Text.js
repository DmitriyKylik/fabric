import React, { useEffect, useState, useCallback } from 'react';
import { textBoxFactory } from '../../factories/factories';
import {useFabricObject} from '../../hooks/useFabricObject';
import {ReactComponent as ArrowUp} from '../../assets/img/arrow_up.svg';
import {ReactComponent as ArrowDown} from '../../assets/img/arrow_down.svg';

const Text = ({ onChange, onRemove, id, canvas, options, containerStyles, navButtonStyles, navButtonsWrapper, activeStyles }) => {
  const factory = useCallback(() => textBoxFactory(options), []);
  const textbox = useFabricObject(factory, canvas, id, options, onChange, onRemove);
  console.log(options);
  useEffect(() => {
    const update = () => {
      onChange(id, textbox?.toObject());
    };
    textbox?.on('changed', update);
  }, [textbox, id, onChange]);

  return textbox ? (
    <div
      onClick={() => {
        console.log('Heello!');
        canvas.setActiveObject(textbox);
      }}
      className={`${containerStyles} ${options?.isActive ? activeStyles : ''}`}
      style={{order: canvas?.getObjects()?.indexOf(textbox)}}
    >
      {canvas?.getObjects()?.indexOf(textbox) + 1}) {textbox?.text}
      <div className={navButtonsWrapper}>
        <button
          className={navButtonStyles}
          onClick={(event) => {
            event.stopPropagation();
            textbox?.sendBackwards(false);
            textbox.fire('moveDown');
          }}>
          <ArrowUp />
        </button>
        <button
          className={navButtonStyles}
          onClick={(event) => {
            event.stopPropagation();
            textbox?.bringForward(false);
            textbox.fire('moveUp');
          }}>
          <ArrowDown />
        </button>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          canvas.remove(textbox);
        }}
      >
        remove
      </button>
    </div>
  ) : null;
};

Text.defautlProps = {
  containerStyles: '',
  navButtonStyles: '',
  navButtonsWrapper: '',
};

export default Text;