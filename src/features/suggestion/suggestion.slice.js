import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSuggestion = createAsyncThunk(
  "suggestion/fetchSuggestion",
  async (arg, thunkAPI) => {
    const response = await fetch("http://localhost:3004/api/suggestion");
    const { data } = await response.json();
    return data;
  }
);

const initialState = {
  suggestion: "",
  loading: false,
  error: true,
};

const options = {
  name: "suggestion",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSuggestion.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchSuggestion.fulfilled]: (
      state,
      { payload: { imageUrl, caption } }
    ) => {
      state.suggestion = { imageUrl, caption };
      state.loading = false;
      state.error = false;
    },
    [fetchSuggestion.error]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
export const selectSuggestion = (state) => state.suggestion.suggestion;
