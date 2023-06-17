export interface IMode {
  label: string;
  value: string;
}

export interface ModeState {
  value: IMode[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: ModeState = {
  value: [
    {
      label: '',
      value: '',
    },
  ],
  status: 'idle',
};
