import React, { useCallback } from 'react';
import { useFabricObject } from '../../hooks/useFabricObject';
import { imageFactory } from '../../factories/factories';

export const Image = (props) => {
    const factory = useCallback(() => imageFactory(props.options), []);
    useFabricObject(factory, props.canvas, props.id, props.options, props.onChange);

    return <></>;
};

export default Image;