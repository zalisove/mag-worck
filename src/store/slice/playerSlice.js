import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    play: false,
    pause: false,
    stop: true,
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        play: (state) => {
            console.log("play")
            state.play = true
            state.pause = false
            state.stop = false
        },
        pause: (state) => {
            console.log("pause")
            state.play = false
            state.pause = true
            state.stop = false
        },
        stop: (state) => {
            console.log("stop")
            state.play = false
            state.pause = false
            state.stop = true
        },
    },
})

export const { play, pause, stop } = playerSlice.actions

export default playerSlice.reducer