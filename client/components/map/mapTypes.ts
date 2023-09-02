export interface ICoord {
  lat: any;
  lon: any;
}

export interface ICoords {
  shape: ICoord[];
  centerCoords: {
    lat: any;
    lon: any;
  };
}

export interface IGetCoords {
  agency: string;
  mode: string;
  route: string;
  direction: string;
}

export interface CoordsState {
  value: ICoords;
  status: 'idle' | 'loading' | 'failed' | 'success' | 'not-found';
}

export const initialState: CoordsState = {
  value: {
    shape: [
      {
        lat: 0,
        lon: 0,
      },
    ],
    centerCoords: {
      lat: 0,
      lon: 0,
    },
  },
  status: 'idle',
};
