export interface IDirection {
  label: string;
  value: string;
}

export interface IGetDirection {
  agency: string;
  mode: string;
  route: string;
}

export interface DirectionState {
  value: IDirection[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: DirectionState = {
  value: [
    {
      label: '',
      value: '',
    },
  ],
  status: 'idle',
};
