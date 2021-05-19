import { useState, useEffect } from 'react';

export const useFabricObject = (objectFactory, canvas, id, options, onChange, onRemove) => {
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
    }, [canvas, element, objectFactory]);

    useEffect(() => {
        const update = (objectData) => {
            onChange(id, objectData);
            canvas.renderAll();
        };

        const remove = () => {
            onRemove(id);
        };

        // element?.on('moved', () => update(element?.toObject()));
        // element?.on('scaled', () => update(element?.toObject()));
        // element?.on('rotated', () => update(element?.toObject()));
        element?.on('selected', () => update({
         ...element?.toObject(),
         isActive: true,
        }));
        element?.on('deselected', () => update(element?.toObject({
            ...element?.toObject(),
            isActive: false,
        })));
        // element?.on('moveDown', () => update(element?.toObject()));
        // element?.on('moveUp', () => update(element?.toObject()));
        element?.on('removed', remove);
        // element?.on('toggleVisible', () => update(element?.toObject()));
        element?.on('update', () => update(element?.toObject()));

    }, [element, id, onChange, onRemove]);

    useEffect(() => {
        element?.setOptions(options);
    }, [element, options]);

    return element;
};