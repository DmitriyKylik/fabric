import { useState, useEffect } from 'react';

export const useFabricObject = (objectFactory, canvas, id, options, onChange) => {
    const [element, setElement] = useState(null);

    useEffect(() => {
        if (element) {
            return;
        }
        const setupObject = async () => {
            const awaitedElement = await objectFactory(options);
            canvas.add(awaitedElement);
            setElement(awaitedElement);
        };
        setupObject();
    }, [canvas, element, objectFactory, options]);

    useEffect(() => {
        const update = () => {
            onChange(id, element?.toObject());
        };
        element?.on('moved', update);
        element?.on('scaled', update);
        element?.on('rotated', update);
        element?.on('moveDown', update);
        element?.on('moveUp', update);
        element?.on('remove', update);
    }, [element, id, onChange]);

    useEffect(() => {
        element?.setOptions(options);
    }, [element, options]);

    return element;
};