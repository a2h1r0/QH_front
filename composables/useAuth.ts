import type { Auth as AuthType } from '~/types/auth';

export const useAuth = () => new Auth();

class Auth {
  _user: Ref<AuthType>;

  constructor() {
    this._user = useState<AuthType>('auth', () => ({ id: null }));
  }

  get user() {
    return readonly(this._user);
  }

  async register(
    email: string,
    password: string,
    username: string,
    display_name: string
  ): Promise<boolean> {
    const { data, error, status } = await useFetch(`/api/register`, {
      method: 'POST',
      body: {
        email,
        password,
        username,
        display_name,
      },
    });
    if (status.value !== 'success') {
      throw showError({
        statusCode: error.value?.data.statusCode,
        message: error.value?.data.message,
      });
    }

    this._user.value.id = data.value;

    return data.value !== null;
  }

  async login(email: string, password: string): Promise<boolean> {
    const { data, error, status } = await useFetch(`/api/login`, {
      method: 'POST',
      body: {
        email,
        password,
      },
    });
    if (status.value !== 'success') {
      throw showError({
        statusCode: error.value?.data.statusCode,
        message: error.value?.data.message,
      });
    }

    this._user.value.id = data.value;

    return data.value !== null;
  }

  logout() {
    this._user.value.id = null;
  }
}
