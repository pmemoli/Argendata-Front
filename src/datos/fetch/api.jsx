import axios from 'axios';

const modo = 'production'
const apiPath = modo === 'production' ? 'https://argendata-back.vercel.app' : 'http://localhost:5000'

export const api = axios.create({
  baseURL: apiPath,
})
