import axios from 'axios';
import { IDirections } from './directionsTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getDirections(
  agency: string,
  mode: string,
  route: string,
  station: string,
): Promise<{ data: IDirections[] }> {
  const result = await axios.get(
    `${apiUrl}/mode/${mode}/agency/${agency}/routes/${route}/station/${station}/directions`,
  );

  return { data: result.data };
}
