import {useCallback, useState} from "react";

export const useFocusObserver = () => {
    const [focused, setFocused] = useState(false);

    const focusOn = useCallback(() => setFocused(true), []);
    const focusOff = useCallback(() => setFocused(false), []);

    return {focused, focusOn, focusOff};
}