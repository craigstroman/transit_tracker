import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { AgencyState, initialState } from './agencyTypes';
import { getAgencies } from './agency.API';

export const getAgenciesAsync = createAsyncThunk('agencies/get', async () => {
  const response = await getAgencies();

  console.log('getAgenciesAsync: ');
  console.log('response: ', response);

  return response.data;
});

export const agencySlice = createSlice({
  name: 'agencies',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAgenciesAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getAgenciesAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value = [...action.payload];
        return newState;
      })
      .addCase(getAgenciesAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = agencySlice.actions;

export const selectAgencyState = (state: RootState): AgencyState => state.agencies;

export default agencySlice.reducer;
