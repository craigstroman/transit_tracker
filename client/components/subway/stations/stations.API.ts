import axios from 'axios';
import { IStations } from './stationsTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getStations(
  agency: string,
  mode: string,
  route: string,
): Promise<{ data: IStations[] }> {
  const result = await axios.get(`${apiUrl}/mode/${mode}/agency/${agency}/routes/${route}`);

  return { data: result.data };
}
