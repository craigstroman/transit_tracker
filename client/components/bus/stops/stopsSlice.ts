import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { StopState, initialState, IGetStops } from './stopsTypes';
import { getStops } from './stops.API';

export const getStopsAsync = createAsyncThunk('stops/get', async (stops: IGetStops) => {
  const response = await getStops(stops.agency, stops.mode, stops.route, stops.direction);

  return response.data;
});

export const stopsSlice = createSlice({
  name: 'stops',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStopsAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getStopsAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value = action.payload;
        return newState;
      })
      .addCase(getStopsAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = stopsSlice.actions;

export const selectStopsState = (state: RootState): StopState => state.stops;

export default stopsSlice.reducer;
