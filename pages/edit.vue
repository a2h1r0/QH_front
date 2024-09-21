<script setup lang="ts">
import { pages } from '~/types/page';

const auth = useAuth();
const schedule = useSchedule();

const title = ref('');
const description = ref('');
const event_date = ref(new Date());
const area = ref('');

const scheduleForm = ref();
// const rules = {
//   title: [(value: any) => !!value || 'ユーザ名は必須項目です。'],
//   description: [(value: any) => !!value || '表示名は必須項目です。'],
//   event_date: [(value: any) => !!value || 'メールアドレスは必須項目です。'],
//   area: [(value: any) => !!value || 'パスワードは必須項目です。'],
// };

const scheduleFailed = ref(false);

const submit = async () => {
  const validate = await scheduleForm.value.validate();

  if (validate.valid) {
    scheduleFailed.value = !schedule.create(
      auth.user.value.id as number,
      title.value,
      description.value,
      event_date.value,
      area.value
    );
  }
};
</script>

<template>
  <div class="d-flex align-center justify-center fill-height">
    <v-card min-width="400px" class="pt-4">
      <h1 class="text-center text-h5 font-weight-bold">スケジュール投稿</h1>

      <v-card-text>
        <v-form ref="scheduleForm">
          <v-text-field
            label="タイトル"
            name="title"
            type="text"
            v-model="title"
            placeholder="飲み会"
          />

          <v-text-field
            label="詳細"
            name="description"
            type="text"
            v-model="description"
            placeholder="オイスターバーで飲む"
          />

          <!-- <v-text-field
            label="メールアドレス"
            name="email"
            type="email"
            v-model="email"
            :rules="rules.email"
            placeholder="kentou@gmail.com"
          /> -->

          <v-text-field label="場所" name="area" type="text" v-model="area" />
        </v-form>
      </v-card-text>

      <p class="text-red" v-if="scheduleFailed">登録に失敗しました．．．</p>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit" color="primary">投稿</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
