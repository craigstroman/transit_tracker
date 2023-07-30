import axios from 'axios';
import { IPredictionsResponse } from './predictionsTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getPredictions(
  agency: string,
  mode: string,
  route: string,
  stop: string,
): Promise<{ data: IPredictionsResponse }> {
  const result = await axios.get(
    `${apiUrl}/mode/${mode}/agency/${agency}/routes/${route}/stops/${stop}/predictions`,
  );

  return { data: result.data };
}
