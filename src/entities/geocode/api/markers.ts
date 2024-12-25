import {IGeocodeSliceItem} from "@entities/geocode/model";
import {api, apiRoutes} from "@shared/api";

export const createMarker = async (dto: IGeocodeSliceItem) => {
    return await api.post<IGeocodeSliceItem, IGeocodeSliceItem>(apiRoutes.createMarker, dto);
}

export const editMarker = async (dto: IGeocodeSliceItem) => {
    const data = {title: dto.title, description: dto.description};
    return await api.patch<Pick<IGeocodeSliceItem, "title" | "description">, IGeocodeSliceItem>(apiRoutes.editMarker + `${dto.id}`, data);
}

export const deleteMarker = async (dto: IGeocodeSliceItem["id"]) => {
    return await api.delete(apiRoutes.deleteMarker + `${dto}`);
}