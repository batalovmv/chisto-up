import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;

export const $api = axios.create({
    withCredentials: true,
    headers:{
        'Accept':'application/json'
    },
    baseURL: API_URL,
});
