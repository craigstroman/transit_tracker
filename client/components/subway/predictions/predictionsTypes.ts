export interface IPredictions {
  Car: string;
  Destination: string;
  DestinationCode: string;
  DestinationName: string;
  Group: string;
  Line: string;
  LocationCode: string;
  LocationName: string;
  Min: string;
}

export interface IGetPredictions {
  agency: string;
  mode: string;
  route: string;
  station: string;
  direction: string;
}

export interface PredictionsState {
  value: IPredictions[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: PredictionsState = {
  value: [
    {
      Car: '',
      Destination: '',
      DestinationCode: '',
      DestinationName: '',
      Group: '',
      Line: '',
      LocationCode: '',
      LocationName: '',
      Min: '',
    },
  ],
  status: 'idle',
};
