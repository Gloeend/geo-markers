import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle, DialogDescription
} from "@shared/ui/shadcn/dialog";
import {Input} from "@shared/ui/shadcn/input";
import {Label} from "@shared/ui/shadcn/label";
import {Button} from "@shared/ui/shadcn/button.tsx";
import {useAppSelector} from "@shared/lib/use-app-selector.ts";
import {selectMarkers, setActiveMarker} from "@entities/geocode/model";
import {FormEventHandler, useCallback, useMemo} from "react";
import {useAppDispatch} from "@shared/lib/use-app.selector.ts";
import {useForm} from "react-hook-form";
import {Textarea} from "@shared/ui/shadcn/textarea.tsx";
import {ICreateMarkerForm, useCreateMarker} from "@entities/geocode/model";


export const GeocodeModal = () => {
    const dispatch = useAppDispatch();
    const {active} = useAppSelector(selectMarkers);
    const {register, handleSubmit} = useForm<ICreateMarkerForm>({
        defaultValues: {
            title: active?.title ? active.title : "",
            description: active?.description ? active.description : ""
        }
    });
    
    const formTitle = useMemo(() => active?.id ? "Изменить маркер" : "Новый маркер", [active]);

    const openMemo = useMemo(() => active !== undefined, [active]);

    const closeMemo = useCallback(() => {
        if (active !== undefined) dispatch(setActiveMarker(undefined));
    }, [active, dispatch]);

    const {onSubmit} = useCreateMarker(active!, closeMemo);

    return <Dialog open={openMemo} onOpenChange={closeMemo}>
        {active && <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{formTitle}</DialogTitle>
                <DialogDescription className="text-[13px]">Введите данные о маркере</DialogDescription>

            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit) as FormEventHandler<HTMLFormElement>}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Название</Label>
                        <Input
                            {...register("title")}
                            id="title"
                            className="col-span-3 text-[13px]"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Описание</Label>
                        <Textarea
                            rows={3}
                            {...register("description")}
                            id="description"
                            className="col-span-3 text-[13px] resize-none"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">Адрес</Label>
                        <Textarea disabled={true} id="address"
                                  value={active.geoObject.metaDataProperty.GeocoderMetaData.Address.formatted}
                                  className="col-span-3 text-[13px] resize-none"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="pos" className="text-right">Координаты</Label>
                        <Input disabled={true} id="pos" value={active.geoObject.Point.pos}
                               className="col-span-3 text-[13px]"/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Сохранить</Button>
                </DialogFooter>
            </form>
        </DialogContent>}
    </Dialog>;
}