<script setup lang="ts">
const email = ref('');
const password = ref('');

const loginForm = ref();
const rules = {
  email: [(value: any) => !!value || 'メールアドレスは必須項目です。'],
  password: [(value: any) => !!value || 'パスワードは必須項目です。'],
};

const submit = async () => {
  const validate = await loginForm.value.validate();

  if (validate.valid) {
    console.log('送信できそう');
  }
};
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
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit" color="primary">ログイン</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
