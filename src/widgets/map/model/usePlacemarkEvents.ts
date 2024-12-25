import {useCallback, useEffect, useState} from "react";
import {removeMarker, selectMarkers, setActiveMarker} from "@entities/geocode/model";
import {useAppDispatch} from "@shared/lib/use-app.selector.ts";
import {useAppSelector} from "@shared/lib/use-app-selector.ts";
import {deleteMarker} from "@entities/geocode/api/markers.ts";

export const usePlacemarkEvents = () => {
    const dispatch = useAppDispatch();
    const {markers} = useAppSelector(selectMarkers);
    const [isDoubleClick, setIsDoubleClick] = useState(false);
    const [deleteId, setDeleteId] = useState<string | undefined>();
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsDoubleClick(false);
        }, 200);
        return () => {
            clearTimeout(timeoutId);
            setTimer(undefined);
        };
    }, [isDoubleClick]);

    const onClick = useCallback((id: string) => {
        if (timer) return;
        const timerId = setTimeout(() => {
            const marker = markers.find((marker) => marker.id === id);
            if (marker && !deleteId) {
                dispatch(setActiveMarker(marker));
                setTimer(undefined);
            }
        }, 500);
        setTimer(timerId);
        return () => {
            clearTimeout(timerId);
        };
    }, [deleteId, dispatch, markers, timer]);


    const onDoubleClick = useCallback((id: string) => {
        clearTimeout(timer);
        setIsDoubleClick(true);
        setDeleteId(id);
    }, [timer]);

    const onConfirmDelete = useCallback(() => {
        if (!deleteId) return;
        void deleteMarker(deleteId);
        dispatch(removeMarker(deleteId));
        setDeleteId(undefined);
    }, [deleteId, dispatch]);

    const onCloseDelete = useCallback(() => setDeleteId(undefined), []);

    return {onClick, onDoubleClick, onConfirmDelete, onCloseDelete, deleteId};
};
