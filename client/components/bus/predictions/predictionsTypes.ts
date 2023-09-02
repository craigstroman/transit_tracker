export interface IPredictions {
  RouteID: string;
  DirectionText: string;
  DirectionNum: string;
  Minutes: number;
  VehicleID: string;
  TripID: string;
}

export interface IPredictionsResponse {
  selectedRoute: IPredictions[];
  otherRoutes: IPredictions[];
}

export interface IGetPredictions {
  agency: string;
  mode: string;
  route: string;
  stop: string;
}

export interface PredictionsState {
  value: IPredictionsResponse;
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: PredictionsState = {
  value: {
    selectedRoute: [
      {
        RouteID: '',
        DirectionText: '',
        DirectionNum: '',
        Minutes: 0,
        VehicleID: '',
        TripID: '',
      },
    ],
    otherRoutes: [
      {
        RouteID: '',
        DirectionText: '',
        DirectionNum: '',
        Minutes: 0,
        VehicleID: '',
        TripID: '',
      },
    ],
  },
  status: 'idle',
};
