import {store} from "@app/store/store.ts";

export type RootState = ReturnType<typeof store.getState>;