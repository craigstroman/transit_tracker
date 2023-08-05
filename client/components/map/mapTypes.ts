export interface ICoords {
  Lat: number;
  Lon: number;
  SeqNumber: number;
}

export interface IGetCoords {
  agency: string;
  mode: string;
  route: string;
}

export interface CoordsState {
  value: ICoords[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: CoordsState = {
  value: [
    {
      Lat: 0,
      Lon: 0,
      SeqNumber: 0,
    },
  ],
  status: 'idle',
};
