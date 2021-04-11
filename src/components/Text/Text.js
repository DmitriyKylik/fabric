import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';

const Text = ({ onChange, id, canvas, options }) => {
  console.log(options.text ?? '', options);
  const [textbox] = useState(() => new fabric.Textbox(options.text ?? '', options));
  // Adding textbox instance to canvas. Watching for canvas and textbox set instance changes.
  useEffect(() => {
    canvas.add(textbox);
  }, [canvas, textbox]);

  useEffect(() => {
    textbox.setOptions(options);

    canvas.renderAll();
  }, [options, textbox]);

  useEffect(() => {
    const update = () => {
      onChange(id, textbox.toObject());
    };

    textbox.on('moved', update);
    textbox.on('scaled', update);
    textbox.on('rotated', update);
    textbox.on('changed', update);
  }, [id, onChange, textbox]);


  return (
    <></>
  );
};

export default Text;