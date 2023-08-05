import axios from 'axios';
import { ICoords } from './mapTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getCoords(mode: string, agency: string, route: string): Promise<{ data: ICoords[] }> {
  const url = `${apiUrl}/mode/${mode}/agency/${agency}/routes/${route}/coords`;

  console.log('url: ', url);
  const result = await axios.get(url);

  return { data: result.data };
}
