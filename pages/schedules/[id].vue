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

onMounted(async () => {
  event.value = await useSchedule().show(route.params.id as unknown as number);

  // if (event.value === null || event.value.apply_user !== auth.user.value.id) {
  //   router.push({ name: 'home' });
  // }
});
</script>

<template>
  <div class="d-flex align-center justify-center fill-height" v-if="event">
    <v-card min-width="400px" class="pt-4">
      <div v-if="event.user == auth_id">
        自分の投稿したスケジュールです
        <div v-if="event.apply_user !== null">
          応募者：{{ event.apply_user_username }}
        </div>
      </div>

      <div v-if="event.apply_user == auth_id">
        自分から誘ったスケジュールです
        <div>誘い先：{{ event.user_username }}</div>
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
  </div>
</template>
