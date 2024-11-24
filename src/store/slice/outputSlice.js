import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 0,
        OC0A: 0,
    }
];

export const outputSlice = createSlice({
    name: 'output',
    initialState,
    reducers: {
        addNew: (state) => {
            const newId = state[state.length - 1].id + 1; // Збільшуємо id на 1
            state.push({
                id: newId,
                OC0A: 0
            });
        },
        updateItem: (state, action) => {
            const { id,  OC0A} = action.payload
            const itemIndex = state.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                state[itemIndex].OC0A = OC0A;
            }
        },
    },
});

export const { updateItem, addNew } = outputSlice.actions;

export default outputSlice.reducer;
