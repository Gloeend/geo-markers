import {useFetchGeocode, useFocusObserver} from "@entities/geocode/model";
import {useForm} from "react-hook-form";
import {FeatureMember, GeoObject, IGetGeocodeDTO} from "@entities/geocode/api/geocode.types.ts";
import {ChangeEvent, createRef, FormEventHandler, useCallback, useState} from "react";
import {Input} from "@shared/ui/shadcn/input.tsx";
import {cn} from "@shared/lib/utils/cn.ts";
import {useAppDispatch} from "@shared/lib/use-app.selector.ts";
import {selectMarkers, setActiveMarker} from "@entities/geocode/model";
import {useAppSelector} from "@shared/lib/use-app-selector.ts";
import {useOutsideClick} from "@shared/model";

export const GeocodeForm = () => {
    const {handleSubmit} = useForm<Pick<IGetGeocodeDTO, "geocode">>();
    const fieldSetRef = createRef<HTMLFieldSetElement>();
    const [collection, setCollection] = useState<FeatureMember[]>();
    const {focused, focusOn, focusOff} = useFocusObserver();
    const {value, setValue, isLoading} = useFetchGeocode(setCollection);
    const dispatch = useAppDispatch();
    const {active} = useAppSelector(selectMarkers);
    
    const setActive = useCallback((val: GeoObject) => {
        dispatch(setActiveMarker({geoObject: val}));
    }, [dispatch]);

    const onChangeMemo = useCallback((ev: ChangeEvent<HTMLInputElement>) => setValue(ev.currentTarget.value), [setValue]);

    useOutsideClick(fieldSetRef, focusOff);

    return <form
        className="relative z-10 w-full flex flex-col items-center justify-center"
        onSubmit={handleSubmit((data) => console.info(data)) as FormEventHandler<HTMLFormElement>}
    >
        <fieldset ref={fieldSetRef} className="flex gap-2 items-center w-1/2 relative">
            <Input type="text" onFocus={focusOn} className="w-full" placeholder="Адрес" onChange={onChangeMemo} value={value} />
            {
                (value !== "" && active === undefined && focused) &&
                <ul className="absolute top-full left-0 w-full bg-primary text-primary-foreground border rounded-lg shadow-md mt-1">
                    {(collection?.length === 0 && !isLoading) && <li className="px-4 py-2 rounded-lg">
                        Не найдено
                    </li>}
                    {collection?.map((item) => <li
                        onClick={() => setActive(item.GeoObject)}
                        key={item.GeoObject.uri}
                        className={cn("px-4 py-2 hover:bg-blue-100 rounded-lg cursor-pointer")}
                    >{item.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted}</li>)}
                </ul>
            }
        </fieldset>
    </form>
}