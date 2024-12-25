import {useAppSelector} from "@shared/lib/use-app-selector.ts";
import {selectMarkers} from "@entities/geocode/model";
import {useCallback, useMemo} from "react";


export const useMapParameters = () => {
    const {markers, center} = useAppSelector(selectMarkers);
    
    const parseGeo = useCallback((pos: string) => {
        const splitted = pos.split(" ");
        return [parseFloat(splitted[1]), parseFloat(splitted[0])];
    }, []);
    
    const centerMemo = useMemo(() => {
        const marker = markers.filter(el => el.id === center)[0]
        if (!center || !markers.length || !marker) {
            return [55.755864, 37.617698];
        }

        return parseGeo(marker.geoObject.Point.pos);
    }, [center, markers, parseGeo]);

    const markersMemo = useMemo(() => markers, [markers]);

    return {center: centerMemo, markers: markersMemo, parse: parseGeo};
}