import {Placemark, Map as YMap} from "@pbe/react-yandex-maps";
import {useMapParameters, usePlacemarkEvents} from "@widgets/map/model";
import {z} from "zod";
import {ConfirmModal} from "@widgets/map/ui/ConfirmModal.tsx";

export const Map = () => {
    const params = useMapParameters();
    const {onDoubleClick, onClick, onCloseDelete, deleteId, onConfirmDelete} = usePlacemarkEvents();

    /**
     * || (Yandex Maps JS API): Invalid API key ||
     * || Support for defaultProps will be removed... ||
     *
     * Эти варны изначально идут с пакетом @pbe/react-yandex-maps
     * Видимо яндекс забил на поддержку
     * **/
    return (
        <>
            <YMap
                style={{width: "100%", height: "500px", marginTop: "60px"}}
                state={{
                    center: z.array(z.number()).parse(params.center),
                    zoom: 10,
                }}
            >
                {params.markers.map((marker) => (
                    <Placemark
                        key={marker.id}
                        geometry={params.parse(marker.geoObject.Point.pos)}
                        onClick={() => onClick(marker.id)}
                        onDblClick={() => onDoubleClick(marker.id)}
                    />
                ))}
            </YMap>
            <ConfirmModal title="Удалить маркер" open={(deleteId !== undefined)}
                          close={onCloseDelete} confirm={onConfirmDelete}>
                Подтвердите, нужно ли удалять маркер или нет.
            </ConfirmModal>
        </>
    );
};
