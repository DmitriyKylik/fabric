import { useState, useCallback } from 'react';

export const useFabricData = (initial) => {
    const [objects, setObjects] = useState(initial);

    const onObjectChange = useCallback((id, options) => {
        setObjects((objects) => ({ ...objects, [id]: options }));
    }, []);

    // const onObjectAdd = useCallback((id, options) => {
    //     setObjects((objects) => ({ ...objects, [id]: options }));
    // }, []);

    const onObjectRemove = useCallback((id) => {
        setObjects((objects) => {
         const {[id] : removedObject, ...filteredObjects } = objects;
         return filteredObjects;
        });
    }, []);

    return [objects, onObjectChange, onObjectRemove];
};