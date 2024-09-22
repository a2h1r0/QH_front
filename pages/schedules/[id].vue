<script setup lang="ts">
import { pages } from '~/types/page';
import { useRouter } from 'vue-router';
import type { Schedule } from '~/types/schedule';

const auth = useAuth();
const auth_id = auth.user.value.id;
const router = useRouter();
const route = useRoute();
const schedule = useSchedule();

const snackbar = ref(false);
const event: Ref<Schedule | null> = ref(null);

const submit = async () => {
  const success = await schedule.request(
    route.params.id as unknown as number,
    auth_id
  );
  if (success) {
    snackbar.value = true;
    event.value = await useSchedule().show(
      route.params.id as unknown as number
    );
  }
};

const goHome = () => {
  router.push({ name: 'home' });
};

onMounted(async () => {
  event.value = await useSchedule().show(route.params.id as unknown as number);

  // if (event.value === null || event.value.apply_user !== auth.user.value.id) {
  //   router.push({ name: 'home' });
  // }
});
</script>

<template>
  <div class="home-container d-flex align-center justify-center fill-height" v-if="event">
    <v-card min-width="400px" class="pt-4">
      <div v-if="event.user == auth_id">
        自分の投稿したスケジュールです
        <div v-if="event.apply_user !== null">
          応募者：{{ event.apply_user_username }}
        </div>
      </div>

      <div v-if="event.apply_user == auth_id">
        自分から誘ったスケジュールです <br>
        <div class="tag">誘い先：{{ event.user_username }}</div>
      </div>

      <h1 class="text-center text-h5 font-weight-bold">{{ event.title }}</h1>

      <v-card-text>
        <h2 class="text-h6">イベントの詳細</h2>
        <p class="text-body-1">{{ event.description }}</p>

        <h2 class="text-h6 mt-4">日時</h2>
        <p class="text-body-1">
          {{ new Date(event.event_date).toLocaleString() }}
        </p>

        <h2 class="text-h6 mt-4">場所</h2>
        <p class="text-body-1">{{ event.area }}</p>
      </v-card-text>

      <v-card-actions v-if="event.user != auth_id && event.apply_user === null">
        <v-spacer />
        <v-btn @click="submit" color="primary">誘う！</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar">
      誘ってみました！確認メールから誰との予定か確認してください！
    </v-snackbar>

    <v-btn @click="goHome" color="secondary" class="mt-4 go-home-btn">Homeへ戻る</v-btn>
  </div>
</template>

<style scoped>
/* 背景をオレンジ色のグラデーションに設定 */
.home-container {
  display: flex;
  flex-direction: column; /* カードとボタンを縦に並べる */
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  padding: 16px;
}

v-card {
  border-radius: 16px !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1) !important;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  margin: 20px;
}

/* タグ風のスタイル */
.tag {
  display: inline-block;
  background-color: #333; /* 背景を濃いグレーに設定 */
  color: #fff; /* 文字色を白に設定 */
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-top: 8px;
  margin-bottom: 8px;
  white-space: nowrap;
}

/* Homeへ戻るボタンのスタイル調整 */
.go-home-btn {
  margin-top: 20px;
  width: 200px; /* ボタンの幅を調整 */
}

/* スマホ対応のためのメディアクエリ */
@media (max-width: 600px) {
  v-card {
    padding: 1rem;
    max-width: 100%;
    margin: 10px;
  }
  .go-home-btn {
    width: 100%; /* スマホでボタンの幅を100%に */
  }
}
</style>