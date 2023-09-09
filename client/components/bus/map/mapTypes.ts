export interface ICoord {
  lat: any;
  lon: any;
}

export interface IGetCoords {
  agency: string;
  mode: string;
  route: string;
  direction: string;
}

export interface CoordsState {
  value: ICoord[];
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: CoordsState = {
  value: [
    {
      lat: 0,
      lon: 0,
    },
  ],
  status: 'idle',
};
