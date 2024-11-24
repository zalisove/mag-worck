import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 0,
        body: {
            bitCount: 8,
            stepCount: 0,
            OCRA: [false, false, false, false, false, false, false, false],
            TCCRnA: [false, false, null, null, null, null, false, false],
            TCCRnB: [null, null, null, null, false, false, false, false],
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
        },
        addNew: (state) => {
            const newId = state[state.length - 1].id + 1; // Збільшуємо id на 1
            state.push({
                id: newId,
                body: {
                    bitCount: 8,
                    OCRA: [false, false, false, false, false, false, false, false],
                    TCCRnA: [false, false, null, null, null, null, false, false],
                    TCCRnB: [null, null, null, null, false, false, false, false],
                }
            });
        }
    },
});

export const { updateItem, addNew } = userInputSlice.actions;

export default userInputSlice.reducer;
