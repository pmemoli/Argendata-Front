import axios, {AxiosInstance} from 'axios';

// 'https://argendata-back.vercel.app'
// 'http://localhost:5000'

export const api: AxiosInstance = axios.create({
  baseURL: process.env.API,
});
