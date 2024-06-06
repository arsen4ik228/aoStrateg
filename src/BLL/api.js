// api.js
import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://24academy.ru/api/',
  headers: {
    'Content-Type': 'application/json',
 },
 withCredentials: true, // Добавляем свойство withCredentials
});

export default instance;
