import axios from 'axios';
import { IPredictions } from './predictionsTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getPredictions(
  agency: string,
  mode: string,
  route: string,
  station: string,
  direction: string,
): Promise<{ data: IPredictions[] }> {
  const result = await axios.get(
    `${apiUrl}/mode/${mode}/agency/${agency}/routes/${route}/station/${station}/directions/${direction}/predictions`,
  );

  return { data: result.data };
}
