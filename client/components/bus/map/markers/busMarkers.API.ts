import axios from 'axios';
import { BusPosition } from './busMarkerTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getBusPositions(
  mode: string,
  agency: string,
  route: string,
): Promise<{ data: BusPosition[] }> {
  const url = `${apiUrl}/mode/${mode}/agency/${agency}/routes/${route}/positions`;

  const result = await axios.get(url);

  return { data: result.data };
}
