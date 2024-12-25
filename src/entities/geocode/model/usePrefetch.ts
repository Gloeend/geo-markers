import {useAppDispatch} from "@shared/lib/use-app.selector.ts";
import {useEffect} from "react";
import {useAppSelector} from "@shared/lib/use-app-selector.ts";
import {fetchData, selectMarkers} from "@entities/geocode/model/geocode.slice.ts";

export const usePrefetch = () => {
    const {status} = useAppSelector(selectMarkers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === undefined) {
            void dispatch(fetchData());
        }
    }, [dispatch, status]);
}