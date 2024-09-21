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

  login(email: string, password: string): Number {
    const id = 1;
    // これ取ってくる

    this._user.value.id = id;

    return 200;
  }

  logout() {
    this._user.value.id = null;
  }
}
