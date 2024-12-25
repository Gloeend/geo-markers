import {useAppDispatch} from "@shared/lib/use-app.selector.ts";
import {addMarker, editMarker, IGeocodeActive} from "@entities/geocode/model/geocode.slice.ts";
import {z} from "zod";
import {useCallback} from "react";
import {createMarker as createMarkerDB, editMarker as editMarkerDB} from "@entities/geocode/api/markers.ts";
import {generateId} from "@shared/lib/generate-id.ts";
import {AxiosError} from "axios";

export interface ICreateMarkerForm {
    title: string;
    description: string;
}

export const useCreateMarker = (defaultValues: IGeocodeActive, close: VoidFunction) => {
    const dispatch = useAppDispatch();
    
    const create = useCallback(async (dto: ICreateMarkerForm) => {
        const data = {...dto, geoObject: defaultValues.geoObject, id: generateId()};
        try {
            await createMarkerDB(data);
            dispatch(addMarker(data));
        } catch (_e) {
            const e = _e as Error;
            console.error(e.message);
        }
    }, [defaultValues, dispatch]);
    
    const edit = useCallback(async (dto: ICreateMarkerForm) => {
        const data = {...dto, id: z.string().parse(defaultValues.id), geoObject: defaultValues.geoObject};
        try {
            await editMarkerDB(data);
            dispatch(editMarker(data));
        } catch (_e) {
            const e = _e as AxiosError;
            console.error(e.message);
        }
    }, [defaultValues, dispatch]);
    

    const onSubmit = useCallback((dto:  ICreateMarkerForm) => {
        try {
            if (defaultValues.id) {
                void edit(dto);
                return close();
            }
            void create(dto);
            return close();
        } catch (_e) {
            const e = _e as Error;
            console.error(e.message);
        }
    }, [close, create, defaultValues, edit]);

    return {onSubmit};
}