import axios from 'axios';
import { IDirection } from './directionsTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getDirection(
  agency: string,
  mode: string,
  route: string,
): Promise<{ data: IDirection[] }> {
  const result = await axios.get(`${apiUrl}/${agency}/mode/${mode}/routes/${route}/direction`);

  return { data: result.data };
}
