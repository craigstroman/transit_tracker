import axios from 'axios';
import { IPredictions, IPredictionsResponse } from './predictionsTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getPredictions(
  agency: string,
  mode: string,
  route: string,
  stop: string,
): Promise<{ data: IPredictionsResponse }> {
  const result = await axios.get(
    `${apiUrl}/${agency}/mode/${mode}/routes/${route}/stops/${stop}/predictions`,
  );

  return { data: result.data };
}
