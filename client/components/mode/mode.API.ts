import axios from 'axios';
import { IMode } from './modeTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getModes(agency: string): Promise<{ data: IMode[] }> {
  const result = await axios.get(`${apiUrl}/${agency}/mode`);

  return { data: result.data };
}
