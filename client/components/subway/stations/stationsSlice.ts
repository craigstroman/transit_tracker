import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { StationsState, initialState, IGetStations } from './stationsTypes';
import { getStations } from './stations.API';

export const getStationsAsync = createAsyncThunk('stations/get', async (stations: IGetStations) => {
  const response = await getStations(stations.agency, stations.mode, stations.route);

  return response.data;
});

export const stationsSlice = createSlice({
  name: 'subway-stations',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStationsAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getStationsAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value = [...action.payload];
        return newState;
      })
      .addCase(getStationsAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = stationsSlice.actions;

export const selectStationsState = (state: RootState): StationsState => state.subwayStations;

export default stationsSlice.reducer;
