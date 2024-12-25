import {combineReducers} from "@reduxjs/toolkit";
import geocode from "@entities/geocode/model/geocode.slice";

export const reducers = combineReducers({
    geocode
});