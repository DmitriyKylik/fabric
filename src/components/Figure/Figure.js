import React, { useCallback } from 'react';
import { useFabricObject } from '../../hooks/useFabricObject';
import { figureFactory } from '../../factories/factories';
import ListItem from "../ListItem/ListItem";

export const Figure = ({ onChange, onRemove, id, canvas, options }) => {
  const factory = useCallback(() => figureFactory(options), []);
  const rect = useFabricObject(factory, canvas, id, options, onChange, onRemove);

  return rect && (
    <ListItem
      canvas={canvas}
      canvasObject={rect}
      options={options}
    />
  );
};

export default Figure;