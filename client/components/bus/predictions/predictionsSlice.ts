import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import {
  IPredictions,
  IPredictionsResponse,
  IGetPredictions,
  initialState,
  PredictionsState,
} from './predictionsTypes';
import { getPredictions } from './predictions.API';

export const getPredictionsAsync = createAsyncThunk(
  'predictions/get',
  async (predictions: IGetPredictions) => {
    const response = await getPredictions(
      predictions.agency,
      predictions.mode,
      predictions.route,
      predictions.stop,
    );

    return response.data;
  },
);

export const predictionsSlice = createSlice({
  name: 'predictions',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPredictionsAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getPredictionsAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value = action.payload;
        return newState;
      })
      .addCase(getPredictionsAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = predictionsSlice.actions;

export const selectPredictionsState = (state: RootState): PredictionsState => state.busPredictions;

export default predictionsSlice.reducer;
