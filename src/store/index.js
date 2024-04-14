import { configureStore } from '@reduxjs/toolkit'
import playerSliceReducer from "./slice/playerSlice";

export const store = configureStore({
    reducer: {
        player: playerSliceReducer
    },
})
