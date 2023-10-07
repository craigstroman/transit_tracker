export interface IDirections {
  label: string;
  value: string;
}

export interface IGetDirections {
  agency: string;
  mode: string;
  route: string;
  station: string;
}

export interface DirectionsState {
  value: IDirections[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: DirectionsState = {
  value: [
    {
      label: '',
      value: '',
    },
  ],
  status: 'idle',
};
