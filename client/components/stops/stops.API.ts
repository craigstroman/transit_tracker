import axios from 'axios';
import { IStop } from './stopsTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getStops(agency: string, mode: string, route: string): Promise<{ data: IStop[] }> {
  const result = await axios.get(`${apiUrl}/${agency}/mode/${mode}/routes/${route}/stops`);

  return { data: result.data };
}
