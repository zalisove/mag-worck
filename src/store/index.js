import { configureStore } from '@reduxjs/toolkit'
import playerSliceReducer from "./slice/playerSlice";
import userInputSliceReducer from "./slice/userInputSlice";
import outputSliceReducer from "./slice/outputSlice";

export const store = configureStore({
    reducer: {
        player: playerSliceReducer,
        userInput: userInputSliceReducer,
        output: outputSliceReducer
    },
})
