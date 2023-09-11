import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000, // Опційно: ліміт часу на запит, наприклад, 10 секунд
  headers: {
    'Content-Type': 'application/json',
    // Можна додати інші заголовки за потреби
  },
});

export default axiosInstance;