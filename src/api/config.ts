import { api } from './client';
// Extraemos la URL base y le quitamos el "/api" para que sirva para las imágenes
export const base_url_img = api.defaults.baseURL?.replace('/api', '') || 'http://localhost:8080';