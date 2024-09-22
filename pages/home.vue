<script lang="ts" setup>
import { useDisplay } from 'vuetify';
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
const { mobile } = useDisplay();

const isShowAuthCalendar = ref(route.query.completed);
const snackbar = ref(route.query.completed === 'true');

const handleEventClick = (value) => {
  router.push(`/schedules/${value.event.id}`);
};

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: mobile.value ? 'dayGridDay' : 'dayGridMonth',
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
      (event) =>
        event.user_id === auth.user.value.id ||
        event.apply_user_id === auth.user.value.id
    );
  } else {
    calendarOptions.value.events = schedule.data.value.filter(
      (event) =>
        event.user_id !== auth.user.value.id && event.apply_user_id === null
    );
  }
});
</script>

<template>
  <div class="background-container">
    <div class="home-container">
      <v-btn
        @click="isShowAuthCalendar = !isShowAuthCalendar"
        :text="
          isShowAuthCalendar
            ? '他人のカレンダーを見る'
            : '自分のカレンダーを見る'
        "
      ></v-btn>

      <v-sheet class="calendar-container">
        <FullCalendar :options="calendarOptions" class="calendar" />
        <v-snackbar v-model="snackbar">予定の公開が完了しました！</v-snackbar>
      </v-sheet>
    </div>
  </div>
</template>

<style scoped>
/* 背景を全体に広げる */
.background-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  padding: 16px; /* 必要に応じてパディングを追加 */
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px; /* 画面幅にフィット */
  padding: 16px;
}

/* カレンダーコンテナの幅と高さを調整 */
.calendar-container {
  width: 100%;
  height: auto;
  margin: 20px auto;
}

/* カレンダーの調整 */
.calendar {
  width: 100%;
  height: auto; /* カレンダーの高さを自動調整 */
}

/* スマホ対応のメディアクエリ */
@media (max-width: 600px) {
  .calendar-container {
    max-width: 100%;
    margin: 10px auto;
  }

  .calendar {
    max-width: 100%;
  }
}
</style>
