<script setup lang="ts">
import { pages } from '~/types/page';

const router = useRouter();
const auth = useAuth();

const username = ref('');
const display_name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
// const accept = false;

const registerForm = ref();
const rules = {
  username: [(value: any) => !!value || 'ユーザ名は必須項目です。'],
  display_name: [(value: any) => !!value || '表示名は必須項目です。'],
  email: [(value: any) => !!value || 'メールアドレスは必須項目です。'],
  password: [(value: any) => !!value || 'パスワードは必須項目です。'],
  password_confirmation: [
    (value: any) => !!value || 'パスワード（再入力）は必須項目です。',
  ],
};

const registerFailed = ref(false);

const submit = async () => {
  const validate = await registerForm.value.validate();

  if (validate.valid) {
    try {
      const success = await auth.register(
        email.value,
        password.value,
        username.value,
        display_name.value
      );
      if (success) {
        // console.log('ログイン成功');
        registerFailed.value = false;
        router.push('/home');
      } else {
        registerFailed.value = true;
      }
    } catch (error) {
      // console.error('ログインリクエスト中にエラーが発生しました:', error);
      registerFailed.value = true;
    }
  }
};
</script>

<template>
  <div class="register-container">
    <v-card class="register-card">
      <h1 class="text-center text-h5 font-weight-bold">新規登録</h1>

      <v-card-text>
        <v-form ref="registerForm">
          <v-text-field
            label="ユーザ名"
            name="username"
            type="text"
            v-model="username"
            :rules="rules.username"
            placeholder="a2h1r0"
          />

          <v-text-field
            label="表示名"
            name="display_name"
            type="text"
            v-model="display_name"
            :rules="rules.display_name"
            placeholder="検討くん"
          />

          <v-text-field
            label="メールアドレス"
            name="email"
            type="email"
            v-model="email"
            :rules="rules.email"
            placeholder="kentou@gmail.com"
          />

          <v-text-field
            label="パスワード"
            name="password"
            type="password"
            v-model="password"
            :rules="rules.password"
          />

          <v-text-field
            label="パスワード（再入力）"
            name="password_confirmation"
            type="password"
            v-model="password_confirmation"
            :rules="rules.password_confirmation"
          />
        </v-form>

        <p class="text-caption mt-2">
          すでにアカウントをお持ちの方は
          <NuxtLink :to="pages.login.path" class="font-weight-bold">こちら</NuxtLink>
        </p>
      </v-card-text>

      <p class="text-error text-center" v-if="registerFailed">登録に失敗しました．．．</p>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit" color="primary" class="register-btn" rounded elevation="2">
          登録
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
/* 全体のグローバルスタイル */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 16px; /* スマホでのパディングを確保 */
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
}

.register-card {
  border-radius: 16px !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1) !important;
  overflow: hidden;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  margin: 20px;
}

/* スマホ対応のためのメディアクエリ */
@media (max-width: 600px) {
  .register-card {
    padding: 1rem; /* スマホ用にパディングを縮小 */
    max-width: 100%; /* 幅を100%にして画面にフィットさせる */
    margin: 10px; /* 余白を少し縮小 */
  }

  .register-btn {
    font-size: 1rem; /* ボタンのテキストサイズを少し小さく */
  }
}

.register-btn {
  width: 100%;
  margin-top: 1rem;
  font-size: 1.1rem;
  text-transform: none;
  letter-spacing: 0.5px;
}

:deep(.v-text-field) {
  margin-bottom: 1rem;
}
</style>