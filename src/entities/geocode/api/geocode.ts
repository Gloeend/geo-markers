import {mapApi} from "@shared/api";
import {IGetGeocodeDTO, IGetGeocodeResponse} from "@entities/geocode/api/geocode.types.ts";
import {z} from "zod";

export const getGeoCode = async (dto: Pick<IGetGeocodeDTO, "geocode">): Promise<IGetGeocodeResponse> => {
    const baseDto = {...dto, format: "json", apikey: z.string().parse(import.meta.env.VITE_MAP_KEY)} as IGetGeocodeDTO;
    return await mapApi.get('', baseDto);
}