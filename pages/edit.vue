<script setup lang="ts">
import { pages } from '~/types/page';
import { useRouter } from 'vue-router';

const auth = useAuth();
const schedule = useSchedule();
const router = useRouter();

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
    const dateValue = new Date(event_date.value);

    if (isNaN(dateValue.getTime())) {
      scheduleFailed.value = true;
      return;
    }

    const success = await schedule.create(
      title.value,
      description.value,
      dateValue,
      area.value
    );

    if (success) {
      router.push({ path: '/home', query: { completed: 'true' } });
    } else {
      scheduleFailed.value = true;
    }
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

          <v-text-field
            label="イベント日付"
            name="event_date"
            type="datetime-local"
            v-model="event_date"
            :min="new Date().toISOString().slice(0, 10)"
            format="YYYY-MM-DD"
          />

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
