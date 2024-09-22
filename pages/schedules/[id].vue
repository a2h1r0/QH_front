<script setup lang="ts">
import { pages } from '~/types/page';
import { useRouter } from 'vue-router';

const auth = useAuth();
const schedule = useSchedule();
const router = useRouter();
const route = useRoute();

const event = ref(null);

const submit = async () => {
  // 申し込みの送信
  //   const validate = await scheduleForm.value.validate();
  //   if (validate.valid) {
  //     const dateValue = new Date(event_date.value);
  //     if (isNaN(dateValue.getTime())) {
  //       scheduleFailed.value = true;
  //       return;
  //     }
  //     const success = await schedule.create(
  //       title.value,
  //       description.value,
  //       dateValue,
  //       area.value
  //     );
  //     if (success) {
  //       router.push({ path: '/home', query: { completed: 'true' } });
  //     } else {
  //       scheduleFailed.value = true;
  //     }
  //   }
};

if (event.value === null) {
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="d-flex align-center justify-center fill-height" v-if="event">
    <v-card min-width="400px" class="pt-4">
      <h1 class="text-center text-h5 font-weight-bold">{{ event.title }}</h1>

      <v-card-text>
        <p>{{ event.description }}</p>
        <p>{{ event.event_date }}</p>
        <p>{{ event.area }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit" color="primary">誘う！</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
