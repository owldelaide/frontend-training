import { USER_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';
import axios from 'axios';

const baseUrl = __IS_DEV__ ? 'http://localhost:8000' : 'https://production.ru';

export const $api = axios.create({
    baseURL: baseUrl,
    headers: {
        authorization: localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '',
    }
});