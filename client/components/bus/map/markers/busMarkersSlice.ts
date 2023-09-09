import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store/store';
import { BusPositionState, initialState, IGetBusPositions } from './busMarkerTypes';
import { getBusPositions } from './busMarkers.API';

export const getBusPositionsAsync = createAsyncThunk(
  'busPositions/get',
  async (busPositions: IGetBusPositions) => {
    const response = await getBusPositions(busPositions.mode, busPositions.agency, busPositions.route);

    return response.data;
  },
);

export const busPositionsSlice = createSlice({
  name: 'busPositions',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBusPositionsAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getBusPositionsAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value = action.payload;
        return newState;
      })
      .addCase(getBusPositionsAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = busPositionsSlice.actions;

export const selectBusPositionState = (state: RootState): BusPositionState => state.busPositions;

export default busPositionsSlice.reducer;
