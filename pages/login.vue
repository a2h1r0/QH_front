<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'; // Nuxt.jsでルーティングを扱うためにimport
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
        console.log("ログイン成功");
        loginFailed.value = false;
        router.push('/home');
      } else {
        loginFailed.value = true;
      }
    } catch (error) {
      console.error('ログインリクエスト中にエラーが発生しました:', error);
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
  <div class="d-flex align-center justify-center fill-height">
    <v-card min-width="400px" class="pt-4">
      <h1 class="text-center text-h5 font-weight-bold">ログイン</h1>

      <v-card-text>
        <v-form ref="loginForm">
          <v-text-field
            label="メールアドレス"
            name="email"
            type="email"
            v-model="email"
            :rules="rules.email"
          />

          <v-text-field
            label="パスワード"
            name="password"
            type="password"
            v-model="password"
            :rules="rules.password"
          />
        </v-form>

        アカウントをお持ちでない方は<NuxtLink :to="pages.register.path"
          >こちら</NuxtLink
        >
      </v-card-text>

      <p class="text-red" v-if="loginFailed">ログインに失敗しました．．．</p>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit" color="primary">ログイン</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
