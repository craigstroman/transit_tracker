import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { DirectionState, initialState, IGetDirection } from './directionsTypes';
import { getDirection } from './directions.API';

export const getDirectionsAsync = createAsyncThunk('direction/get', async (direction: IGetDirection) => {
  const response = await getDirection(direction.agency, direction.mode, direction.route);

  return response.data;
});

export const directionSlice = createSlice({
  name: 'direction',
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
        newState.value = action.payload;
        return newState;
      })
      .addCase(getDirectionsAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = directionSlice.actions;

export const selectDirectionState = (state: RootState): DirectionState => state.directionBus;

export default directionSlice.reducer;
