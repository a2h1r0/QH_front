<script setup lang="ts">
import { pages } from '~/types/page';
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();
const route = useRoute();
const schedule = useSchedule();

const snackbar = ref(false);
const event = ref(null);

const submit = async () => {
  const success = await schedule.request(
    route.params.id as unknown as number,
    auth.user.value.id
  );
  if (success) {
    snackbar.value = true;
  }
};

onMounted(async () => {
  event.value = await useSchedule().show(route.params.id as unknown as number);

  if (event.value === null) {
    router.push({ name: 'home' });
  }
});
</script>

<template>
  <div class="d-flex align-center justify-center fill-height" v-if="event">
    <v-card min-width="400px" class="pt-4">
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

      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit" color="primary">誘う！</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar">
      誘ってみました！確認メールから誰との予定か確認してください！
    </v-snackbar>
  </div>
</template>
