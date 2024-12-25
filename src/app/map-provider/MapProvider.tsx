import {YMaps} from '@pbe/react-yandex-maps';
import {z} from "zod";
import {PropsWithChildren} from "react";

export const MapProvider = ({children}: PropsWithChildren) => {
    const zl = z.enum(["tr_TR" , "en_US" , "en_RU" , "ru_RU" , "ru_UA" , "uk_UA"]).parse(import.meta.env.VITE_LANG);
    return <YMaps query={{lang: zl}}>{children}</YMaps>;
};