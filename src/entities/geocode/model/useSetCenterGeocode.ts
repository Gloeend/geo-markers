import {useAppDispatch} from "@shared/lib/use-app.selector.ts";
import {useCallback} from "react";
import {IGeocodeSliceItem, setCenterMarker} from "@entities/geocode/model/geocode.slice.ts";
import {z} from "zod";

export const useSetCenterGeocode = () => {
    const dispatch = useAppDispatch();

    const setCenterMemo = useCallback((dto: IGeocodeSliceItem["id"]) => {
        const parsed = z.string().parse(dto);
        dispatch(setCenterMarker(parsed));
    }, [dispatch]);

    return {setCenterMemo};
}