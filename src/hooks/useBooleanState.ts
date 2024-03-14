import { useState } from 'react';

export const useBooleanState: (initial: boolean) => [
    boolean,
    () => void,
    () => void,
    (value: boolean) => void,
] = (initialValue: boolean) => {
    const [value, setValue] = useState(initialValue);

    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);

    return [
        value,
        setTrue,
        setFalse,
        setValue,
    ];
};
