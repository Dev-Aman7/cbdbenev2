import axios from 'axios';
import { BASE_URL, AUTH_URL } from '../constants/ProjectSetting';

const BaseUrl = axios.create({
    baseURL: BASE_URL,
});

BaseUrl.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    'token'
)}`;

const AuthUrl = axios.create({
    baseURL: AUTH_URL,
});
export { BaseUrl, AuthUrl };
