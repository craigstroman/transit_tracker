export interface IAgencies {
  label: string;
  value: string;
}

export interface AgencyState {
  value: IAgencies[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: AgencyState = {
  value: [
    {
      label: '',
      value: '',
    },
  ],
  status: 'idle',
};
