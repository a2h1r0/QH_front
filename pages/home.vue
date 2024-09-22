<script lang="ts" setup>
import { pages } from '~/types/page';
import { useRouter } from 'vue-router';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

useHead(pages.index.head);
const auth = useAuth();
const router = useRouter();
const route = useRoute();
const schedule = useSchedule();

const isShowAuthCalendar = ref(route.query.completed);
const message = ref(route.query.completed);

const handleEventClick = (arg) => {
  console.log(arg.event.id);

  // こっからpushで詳細ページへ遷移！
};

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  eventClick: handleEventClick,
});

onMounted(async () => {
  await auth.restoreSession(); // 非同期処理を待つ

  if (!auth.user.value.id) {
    router.push({ name: 'login' });
  } else {
    await schedule.index(auth.user.value.id); // ユーザーIDに基づいてスケジュールを取得
  }
});

watchEffect(() => {
  if (isShowAuthCalendar.value) {
    calendarOptions.value.events = schedule.data.value.filter(
      (event) => event.user_id === auth.user.value.id
    );
  } else {
    calendarOptions.value.events = schedule.data.value.filter(
      (event) => event.user_id !== auth.user.value.id
    );
  }
});
</script>

<template>
  <v-btn
    @click="isShowAuthCalendar = !isShowAuthCalendar"
    :text="
      isShowAuthCalendar ? '他人のカレンダーを見る' : '自分のカレンダーを見る'
    "
  ></v-btn>

  <v-sheet>
    <FullCalendar :options="calendarOptions" />

    <v-snackbar v-model="message">予定の公開が完了しました！</v-snackbar>
  </v-sheet>
</template>
