export interface BusPosition {
  VehicleID: string;
  Lat: any;
  Lon: any;
  Deviation: number;
  DateTime: string;
  TripId: string;
  RouteId: string;
  DirectionNum: number;
  DirectionText: string;
  TripHeadSign: string;
  TripStartTime: string;
  TripEndTime: string;
  BlockNumber: string;
}

export interface IGetBusPositions {
  agency: string;
  mode: string;
  route: string;
}

export interface BusPositionState {
  value: BusPosition[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: BusPositionState = {
  value: [
    {
      VehicleID: '',
      Lat: 0,
      Lon: 0,
      Deviation: 0,
      DateTime: '',
      TripId: '',
      RouteId: '',
      DirectionNum: 0,
      DirectionText: '',
      TripHeadSign: '',
      TripStartTime: '',
      TripEndTime: '',
      BlockNumber: '',
    },
  ],
  status: 'idle',
};
