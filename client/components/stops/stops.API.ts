import axios from 'axios';
import { IStop } from './stopsTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getStops(
  agency: string,
  mode: string,
  route: string,
  direction: string,
): Promise<{ data: IStop[] }> {
  const result = await axios.get(
    `${apiUrl}/mode/${mode}/agency/${agency}/routes/${route}/direction/${direction}/stops`,
  );

  return { data: result.data };
}
