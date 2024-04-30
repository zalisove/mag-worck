import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 0,
        type: "atmega_2560",
        counterNumber: "0",
        body: {
            bitCount: 8,
            TCCRnA: [false, true, false, false, false, false, false, false],
            TCCRnB: [false, false, false, false, false, false, false, false],
        }
    }
];

export const userInputSlice = createSlice({
    name: 'userInput',
    initialState,
    reducers: {
        updateItem: (state, action) => {
            const { id, updatedValues } = action.payload;
            const itemIndex = state.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                state[itemIndex].body = { ...state[itemIndex].body, ...updatedValues };
            }
            console.log(state[itemIndex].body)
        },
    },
});

export const { updateItem } = userInputSlice.actions;

export default userInputSlice.reducer;
