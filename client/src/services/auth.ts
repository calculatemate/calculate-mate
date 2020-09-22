import axios from 'axios';
import getApi, { BASE_URL } from '../api';
import { LoginParams, RegisterParams } from '../store/ducks/auth';

const auth = {
  async login({ username, password }: LoginParams): Promise<string> {
    const response = await getApi().post('/auth/login', {
      username,
      password,
    });
    return response.data;
  },
  async createUser({ username, lastName, firstName, password }: RegisterParams): Promise<string> {
    const response = await getApi().post('/user', {
      username,
      password,
      lastName,
      firstName,
      role: 'USER',
    });
    return response.data;
  },
  async userInfo({ username }: { username: string }): Promise<Record<string, any>> {
    const response = await getApi().post('/user/info', {
      username,
    });
    return response.data;
  },
  async requestResetPassword({ username }: { username: string }): Promise<Record<string, any>> {
    const response = await getApi().post('/auth/reset-password', {
      username,
    });
    return response.data;
  },
  async changePassword({
    userId,
    newPassword,
    token,
  }: {
    userId: string;
    newPassword: string;
    token: string;
  }): Promise<Record<string, any>> {
    const response = await axios.post(
      `${BASE_URL}/auth/change-password`,
      {
        userId,
        newPassword,
      },
      {
        headers: {
          auth: token,
        },
      },
    );
    return response.data;
  },
};

export default auth;
