import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  keywords: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyWords: (state, action: PayloadAction<string>) => {
      state.keywords = action.payload;
    },
  },
});

export const { setKeyWords } = searchSlice.actions;

export default searchSlice.reducer;
