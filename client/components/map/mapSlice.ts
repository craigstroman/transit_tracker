import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { CoordsState, initialState, IGetCoords } from './mapTypes';
import { getCoords } from './map.API';

export const getCoordsAsync = createAsyncThunk('coords/get', async (coords: IGetCoords) => {
  const response = await getCoords(coords.mode, coords.agency, coords.route, coords.direction);

  return response.data;
});

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoordsAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getCoordsAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value.shape = action.payload.shape;
        newState.value.centerCoords = action.payload.centerCoords;
        return newState;
      })
      .addCase(getCoordsAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = mapSlice.actions;

export const selectCoordsState = (state: RootState): CoordsState => state.coords;

export default mapSlice.reducer;
