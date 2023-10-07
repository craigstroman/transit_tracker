export interface IStations {
  label: string;
  value: string;
}

export interface IGetStations {
  agency: string;
  mode: string;
  route: string;
}

export interface StationsState {
  value: IStations[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: StationsState = {
  value: [
    {
      label: '',
      value: '',
    },
  ],
  status: 'idle',
};
