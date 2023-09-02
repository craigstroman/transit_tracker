export interface IRoutes {
  label: string;
  value: string;
}

export interface IGetRoutes {
  agency: string;
  mode: string;
}

export interface RoutesState {
  value: IRoutes[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: RoutesState = {
  value: [
    {
      label: '',
      value: '',
    },
  ],
  status: 'idle',
};
