import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { RoutesState, initialState, IGetRoutes } from './routesTypes';
import { getRoutes } from './routes.API';

export const getRoutesAsync = createAsyncThunk('routes/get', async (routes: IGetRoutes) => {
  const response = await getRoutes(routes.agency, routes.mode);

  return response.data;
});

export const routesSlice = createSlice({
  name: 'bus-routes',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoutesAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getRoutesAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value = [...action.payload];
        return newState;
      })
      .addCase(getRoutesAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = routesSlice.actions;

export const selectRoutesState = (state: RootState): RoutesState => state.busRoutes;

export default routesSlice.reducer;
