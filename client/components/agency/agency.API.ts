import axios from 'axios';
import { IAgencies } from './agencyTypes';

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export async function getAgencies(): Promise<{ data: IAgencies[] }> {
  const result = await axios.get(`${apiUrl}/agencies`);

  return { data: result.data };
}
