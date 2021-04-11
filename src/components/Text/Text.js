import React, { useEffect, useCallback } from 'react';
import { fabric } from 'fabric';
import { textBoxFactory } from '../../factories/factories';
import {useFabricObject} from '../../hooks/useFabricObject';

const Text = ({ onChange, id, canvas, options }) => {
  const factory = useCallback(() => textBoxFactory(options), []);
  const textbox = useFabricObject(factory, canvas, id, options, onChange);

  // Adding textbox instance to canvas. Watching for canvas and textbox set instance changes.

  useEffect(() => {
    const update = () => {
      onChange(id, textbox.toObject());
    };

    textbox.on('changed', update);
  }, [id, onChange, textbox]);


  return (
    <></>
  );
};

export default Text;