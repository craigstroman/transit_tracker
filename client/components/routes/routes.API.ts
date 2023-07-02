import axios from 'axios';
import { IRoutes } from './routesTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getRoutes(agency: string, mode: string): Promise<{ data: IRoutes[] }> {
  const result = await axios.get(`${apiUrl}/${agency}/mode/${mode}/routes`);

  return { data: result.data };
}
