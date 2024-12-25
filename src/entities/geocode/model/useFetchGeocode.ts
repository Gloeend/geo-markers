import {FeatureMember} from "@entities/geocode/api/geocode.types.ts";
import {getGeoCode} from "@entities/geocode/api";
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {z} from "zod";

export const useFetchGeocode = (setCollection: Dispatch<SetStateAction<FeatureMember[] | undefined>>) => {
    const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);
    const [value, setValue] = useState<string>("");

    const fetch = useCallback(async () => {
        if (!z.string().parse(value)) return;
        try {
            const r = await getGeoCode({geocode: value});
            setCollection(r.response.GeoObjectCollection.featureMember);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [setCollection, value]);

    useEffect(() => {
        if (value.length === 0) return;
        setIsLoading(true);
        const handler = setTimeout(() => {
            void fetch();
        }, 1000);

        return () => clearTimeout(handler);
    }, [fetch, value.length]);


    return {value, setValue, isLoading};
}