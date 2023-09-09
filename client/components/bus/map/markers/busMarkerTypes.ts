export interface BusPosition {
  VehicleID: string;
  Lat: any;
  Lon: any;
  Deviation: number;
  DateTime: string;
  TripId: string;
  RouteID: string;
  DirectionNum: number;
  DirectionText: string;
  TripHeadsign: string;
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
      RouteID: '',
      DirectionNum: 0,
      DirectionText: '',
      TripHeadsign: '',
      TripStartTime: '',
      TripEndTime: '',
      BlockNumber: '',
    },
  ],
  status: 'idle',
};
