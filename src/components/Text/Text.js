import React, { useEffect, useState, useCallback } from 'react';
import { textBoxFactory } from '../../factories/factories';
import {useFabricObject} from '../../hooks/useFabricObject';
import ListItem from "../ListItem/ListItem";

const Text = ({ onChange, onRemove, id, canvas, options }) => {
  const factory = useCallback(() => textBoxFactory(options), []);
  const textbox = useFabricObject(factory, canvas, id, options, onChange, onRemove);

  useEffect(() => {
    const update = () => {
      onChange(id, textbox?.toObject());
    };
    textbox?.on('changed', update);
  }, [textbox, id, onChange]);

  return textbox && (
      <ListItem
        canvas={canvas}
        canvasObject={textbox}
        options={options}
      />
  );
};

Text.defautlProps = {
  containerStyles: '',
  navButtonStyles: '',
  navButtonsWrapper: '',
};

export default Text;