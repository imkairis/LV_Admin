import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkMode: false,
    },
    reducers: {
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
        },
    },
});

export const { setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
