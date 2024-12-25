import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "@shared/lib/root-state.ts";
import {GeoObject} from "@entities/geocode/api/geocode.types.ts";
import {api} from "@shared/api";

export interface IGeocodeSliceItem {
    id: string;
    title: string;
    description: string;
    geoObject: GeoObject;
}

export interface IGeocodeActive {
    id?: string;
    title?: string;
    description?: string;
    geoObject: GeoObject;
}

export interface IGeocodeSlice {
    markers: IGeocodeSliceItem[],
    active: IGeocodeActive | undefined,
    center: IGeocodeSliceItem["id"] | undefined,
    status?: "loading" | "success" | "failed",
    error?: string,
}

export const fetchData = createAsyncThunk('/fetchData', async () => {
    return await api.get<IGeocodeSliceItem[]>('/markers');
});

export const geocodeSlice = createSlice({
    name: "geocode",
    initialState: {
        status: undefined,
        markers: [],
        active: undefined,
        center: undefined
    } as IGeocodeSlice,
    reducers: {
        addMarker: (state, {payload}: { payload: IGeocodeSliceItem }) => {
            state.markers.push(payload);
        },
        removeMarker: (state, {payload}: { payload: IGeocodeSliceItem["id"] }) => {
            const index = state.markers.findIndex(el => el.id === payload);
            state.markers.splice(index, 1);
        },
        editMarker: (state, {payload}: { payload: IGeocodeSliceItem }) => {
            const marker = state.markers.find(el => el.id === payload.id);
            if (marker) {
                Object.assign(marker, payload);
            }
        },
        setActiveMarker: (state, {payload}: { payload: IGeocodeActive | undefined }) => {
            state.active = payload;
        },
        setCenterMarker: (state, {payload}: { payload: IGeocodeSliceItem["id"] | undefined }) => {
            state.center = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'success';
                state.markers = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const {addMarker, removeMarker, editMarker, setActiveMarker, setCenterMarker} = geocodeSlice.actions;
export const selectMarkers = (state: RootState) => state.geocode;
export default geocodeSlice.reducer;