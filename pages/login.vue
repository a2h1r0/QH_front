<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { pages } from '~/types/page';

const auth = useAuth();
const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');

const loginForm = ref();
const rules = {
  email: [(value: any) => !!value || 'メールアドレスは必須項目です。'],
  password: [(value: any) => !!value || 'パスワードは必須項目です。'],
};

const loginFailed = ref(false);

const submit = async () => {
  const validate = await loginForm.value.validate();

  if (validate.valid) {
    try {
      const success = await auth.login(email.value, password.value);
      if (success) {
        // console.log("ログイン成功");
        loginFailed.value = false;
        router.push('/home');
      } else {
        loginFailed.value = true;
      }
    } catch (error) {
      // console.error('ログインリクエスト中にエラーが発生しました:', error);
      loginFailed.value = true;
    }
  }
};

onMounted(() => {
  const userId = sessionStorage.getItem('user_id');
  if (userId && route.name !== 'login') {
    router.push('/home');
  }
});
</script>

<template>
  <div class="login-container">
    <v-card class="login-card">
      <div class="logo-container">
        <img src="../assets/images/logo.jpg" alt="Logo" class="logo" />
      </div>
      <h1 class="text-center text-h5 font-weight-bold mb-6">ログイン</h1>

      <v-card-text>
        <v-form ref="loginForm">
          <v-text-field
            label="メールアドレス"
            name="email"
            type="email"
            v-model="email"
            :rules="rules.email"
            prepend-inner-icon="mdi-email"
            outlined
            dense
          />

          <v-text-field
            label="パスワード"
            name="password"
            type="password"
            v-model="password"
            :rules="rules.password"
            prepend-inner-icon="mdi-lock"
            outlined
            dense
          />
        </v-form>

        <p class="text-caption mt-2">
          アカウントをお持ちでない方は
          <NuxtLink :to="pages.register.path" class="font-weight-bold">こちら</NuxtLink>
        </p>
      </v-card-text>

      <p class="text-error text-center" v-if="loginFailed">ログインに失敗しました。</p>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit" color="primary" class="login-btn" rounded elevation="2">
          ログイン
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
/* グローバルスタイル */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 16px; /* スマホでのパディングを確保 */
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
}

.login-card {
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
  .login-card {
    padding: 1rem; /* スマホ用にパディングを縮小 */
    max-width: 100%; /* 幅を100%にして画面にフィットさせる */
    margin: 10px; /* 余白を少し縮小 */
  }

  .logo-container {
    margin-bottom: 0.5rem; /* ロゴの下の余白を縮小 */
  }

  .login-btn {
    font-size: 1rem; /* ボタンのテキストサイズを少し小さく */
  }
}

.logo-container {
  text-align: center;
  margin-bottom: 1rem;
}

.logo {
  width: 120px;
  height: auto;
}

.login-btn {
  width: 100%;
  margin-top: 1rem;
  font-size: 1.1rem;
  text-transform: none;
  letter-spacing: 0.5px;
}

:deep(.v-text-field) {
  margin-bottom: 1rem;
}

:deep(.v-input__prepend-inner) {
  margin-right: 8px;
}
</style>