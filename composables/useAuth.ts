import type { Auth as AuthType } from '~/types/auth';

export const useAuth = () => new Auth();

class Auth {
  _user: Ref<AuthType>;

  constructor() {
    this._user = useState<AuthType>('auth', () => ({ id: null }));
  }

  get user() {
    return readonly(this._user); // 外部からはreadonly
  }

  // ユーザー登録
  async register(
    email: string,
    password: string,
    username: string,
    displayname: string
  ): Promise<boolean> {
    const { data, error, status } = await useFetch(`/api/register`, {
      method: 'POST',
      body: {
        email,
        password,
        username,
        displayname,
      },
    });
  
    if (status.value !== 'success') {
      throw showError({
        statusCode: error.value?.data.statusCode,
        message: error.value?.data.message,
      });
    }
  
    // data.value が数値かどうか確認
    if (data.value != null && typeof data.value === 'number') {
      this._user.value.id = data.value;
      sessionStorage.setItem('user_id', String(data.value));
    }
  
    return data.value !== null;
  }
  

  // ログイン処理
  async login(email: string, password: string): Promise<boolean> {
    const { data, error, status } = await useFetch<number | null>(`/api/login`, {
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
  
    // data.value が数値かどうか確認
    if (data.value != null && typeof data.value === 'object' && 'id' in data.value){
      const valueWithId = data.value as { id: number };
      console.log(" typeof data.value.idあ : ", typeof valueWithId.id);
      sessionStorage.setItem('user_id', String(valueWithId.id)); 
      console.log("ログイン成功: user_id がセッションストレージに保存されました:", valueWithId.id); 
    } else {
      console.error("ログインエラー: データが無効または数値ではありません:", data.value);  // ログ追加
    }
  
    return data.value !== null;
  }

  // ログアウト処理
  logout() {
    this._user.value.id = null;
    sessionStorage.removeItem('user_id');
  }

  // セッションストレージからユーザーIDを復元
  restoreSession() {
    const userIdStr = sessionStorage.getItem('user_id');
    console.log("セッションストレージから取得した user_id:", userIdStr);
  
    if (userIdStr) {
      const userId = Number(userIdStr);
      if (!isNaN(userId)) {
        this._user.value.id = userId;
        console.log("セッションから復元した user_id:", userId);
      } else {
        console.error('user_id is invalid:', userIdStr);
      }
    } else {
      console.log('user_id not found in sessionStorage');
    }
  }
}
