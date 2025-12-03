import { api } from './client';
export const base_url_img = api.defaults.baseURL?.replace('/api', '') || 'http://localhost:8080';