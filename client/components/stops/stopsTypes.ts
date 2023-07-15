export interface IStop {
  label: string;
  value: string;
}

export interface IGetStops {
  agency: string;
  mode: string;
  route: string;
}

export interface StopState {
  value: IStop[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: StopState = {
  value: [
    {
      label: '',
      value: '',
    },
  ],
  status: 'idle',
};
