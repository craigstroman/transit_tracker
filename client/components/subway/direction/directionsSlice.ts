import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { DirectionsState, initialState, IGetDirections } from './directionsTypes';
import { getDirections } from './directions.API';

export const getDirectionsAsync = createAsyncThunk('directions/get', async (directions: IGetDirections) => {
  const response = await getDirections(
    directions.agency,
    directions.mode,
    directions.route,
    directions.station,
  );

  return response.data;
});

export const directionsSlice = createSlice({
  name: 'subway-directions',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDirectionsAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getDirectionsAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value = [...action.payload];
        return newState;
      })
      .addCase(getDirectionsAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = directionsSlice.actions;

export const selectDirectionsState = (state: RootState): DirectionsState => state.subwayDirections;

export default directionsSlice.reducer;
