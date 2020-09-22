import axios, { AxiosInstance } from 'axios';
import { isDev } from '../utils/getEnvironment';
import getAccessToken from '../utils/getAccessToken';

export const BASE_URL = isDev ? 'http://localhost:5000/api' : 'https://calculate-mate.herokuapp.com/api';

const getApi = (): AxiosInstance => axios.create({ baseURL: BASE_URL, headers: { auth: getAccessToken() } });

export default getApi;
