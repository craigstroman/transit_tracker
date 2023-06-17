import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { ModeState, initialState } from './modeTypes';
import { getModes } from './mode.API';

export const getModesAsync = createAsyncThunk('modes/get', async (agency: string) => {
  const response = await getModes(agency);

  return response.data;
});

export const modeSlice = createSlice({
  name: 'modes',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getModesAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getModesAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value = action.payload;
        return newState;
      })
      .addCase(getModesAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = modeSlice.actions;

export const selectModeState = (state: RootState): ModeState => state.modes;

export default modeSlice.reducer;
