import React, { useCallback } from 'react';
import { useFabricObject } from '../../hooks/useFabricObject';
import { imageFactory } from '../../factories/factories';
import ListItem from "../ListItem/ListItem";

export const Image = ({ onChange, onRemove, id, canvas, options }) => {
    const factory = useCallback(() => imageFactory(options), []);
  debugger;
    const image = useFabricObject(factory, canvas, id, options, onChange, onRemove);

    return image && (
      <ListItem
        canvas={canvas}
        canvasObject={image}
        options={options}
      />
    );
};

export default Image;