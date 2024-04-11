import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;


// Создание экземпляра axios с базовыми настройками
const api = axios.create({
    baseURL: API_URL,
  
});

// Добавление интерцептора запроса
api.interceptors.request.use(
    (config) => {
        // Пытаемся получить токен из localStorage
        const token = localStorage.getItem('auth_token');
        if (token) {
            // Если токен существует, добавляем его в заголовок 'Authorization'
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Пробрасываем ошибку, если что-то пошло не так при установке заголовка
        return Promise.reject(error);
    }
);

export default api;