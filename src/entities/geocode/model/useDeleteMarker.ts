import {useAppDispatch} from "@shared/lib/use-app.selector.ts";
import {useCallback} from "react";
import {IGeocodeSliceItem, removeMarker} from "@entities/geocode/model/geocode.slice.ts";
import {deleteMarker as deleteMarkerDB} from "@entities/geocode/api/markers.ts";
import {AxiosError} from "axios";

export const useDeleteMarker = () => {
    const dispatch = useAppDispatch();

    const deleteMarker = useCallback(async (id: IGeocodeSliceItem["id"]) => {
        try {
            await deleteMarkerDB(id);
            return dispatch(removeMarker(id));
        } catch (_e) {
            const e = _e as AxiosError;
            console.error(e.message);
        }
    }, [dispatch]);

    return {deleteMarker};
}