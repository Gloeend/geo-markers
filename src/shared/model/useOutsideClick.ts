import {RefObject, useCallback, useEffect} from "react";

export const useOutsideClick = <T extends HTMLElement>(ref: RefObject<T>, onOutsideClick: VoidFunction) => {

    const clickEvent = useCallback((e: MouseEvent) => {
        if (!ref.current!.contains(e.target as Node)) {
            return onOutsideClick();
        }
    }, [onOutsideClick, ref]);

    useEffect(() => {
        document.addEventListener("mousedown", clickEvent);

        return () => {
            document.removeEventListener("mousedown", clickEvent)
        }
    }, [clickEvent, ref]);
}