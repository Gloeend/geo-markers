import {useAppSelector} from "@shared/lib/use-app-selector.ts";
import {selectMarkers, setActiveMarker, useDeleteMarker} from "@entities/geocode/model";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@shared/ui/shadcn/card.tsx";
import {Button} from "@shared/ui/shadcn/button.tsx";
import {MouseEvent, useCallback, useState} from "react";
import {X, View, Edit} from "lucide-react";
import {useSetCenterGeocode} from "@entities/geocode/model";
import {z} from "zod";
import {useAppDispatch} from "@shared/lib/use-app.selector.ts";

export const GeocodeList = () => {
    const [show, setShow] = useState<boolean>(false);
    const {markers} = useAppSelector(selectMarkers);
    const dispatch = useAppDispatch();
    const {setCenterMemo} = useSetCenterGeocode();
    const {deleteMarker} = useDeleteMarker();

    const onScrollTo = useCallback(
        (e: MouseEvent<HTMLSpanElement>) => {
            const id = z.string().length(36, "incorrect uuid").parse(e.currentTarget.getAttribute("data-marker"));
            setCenterMemo(id);
        }, [setCenterMemo]
    );
    const onDeleteMemo = useCallback(
        (e: MouseEvent<HTMLSpanElement>) => {
            const id = z.string().length(36, "incorrect uuid").parse(e.currentTarget.getAttribute("data-marker"));
            void deleteMarker(id);
        }, [deleteMarker]
    );
    const onEditMemo = useCallback(
        (e: MouseEvent<HTMLSpanElement>) => {
            const id = z.string().length(36, "incorrect uuid").parse(e.currentTarget.getAttribute("data-marker"));
            dispatch(setActiveMarker(markers.find(e => e.id === id)));
        }, [dispatch, markers]
    );

    return <>
        {
            !show ?
                <Button onClick={() => setShow(true)} className="fixed top-[20px] left-[20px]">Маркеры</Button> :
                <Card className="bg-accent fixed w-[475px] left-[20px] top-[20px] z-20">
                    <button
                        onClick={() => setShow(false)}
                        type="button"
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4"/>
                        <span className="sr-only">Закрыть</span>
                    </button>
                    <CardHeader>
                        <CardTitle className="text-[16px]">Маркеры</CardTitle>
                        <CardDescription className="text-[12px]">
                            Чтобы добавить маркер - введите адрес и выберите нужный из
                            списка
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {markers.length > 0 &&
                            <ul className="h-[200px] rounded-md border scrollbar overflow-y-scroll pr-3">
                                {markers.map(marker => (
                                    <li key={marker.id} className="text-[13px] w-full flex mb-2 gap-2">
                                        <span>{marker.title}</span>
                                        <span className="mx-auto">{marker.geoObject.Point.pos}</span>
                                        <div className="flex gap-1">
                                            <span
                                                onClick={onScrollTo}
                                                data-marker={marker.id}
                                                className="cursor-pointer"
                                            >
                                            <View className="size-5"/>
                                        </span>
                                            <span
                                                onClick={onEditMemo}
                                                data-marker={marker.id}
                                                className="cursor-pointer"
                                            >
                                            <Edit className="size-5"/>
                                        </span>
                                            <span
                                                onClick={onDeleteMemo}
                                                data-marker={marker.id}
                                                className="cursor-pointer"
                                            >
                                            <X className="size-5"/>
                                            <span className="sr-only">Закрыть</span>
                                        </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>}
                    </CardContent>
                </Card>
        }
    </>;
}