<script setup lang="ts">
import { pages } from '~/types/page';

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

const submit = async () => {
  const validate = await registerForm.value.validate();

  if (validate.valid) {
    console.log('送信できそう');
  }
};
</script>

<template>
  <div class="d-flex align-center justify-center fill-height">
    <v-card min-width="400px" class="pt-4">
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

        すでにアカウントをお持ちの方は<NuxtLink :to="pages.login.path"
          >こちら</NuxtLink
        >
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit" color="primary">登録</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
