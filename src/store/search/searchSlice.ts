import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  keywords: '',
  category: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyWords: (state, action: PayloadAction<string>) => {
      state.keywords = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setKeyWords, setCategory } = searchSlice.actions;

export default searchSlice.reducer;
