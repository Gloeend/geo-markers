import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "@shared/lib/root-state.ts";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;