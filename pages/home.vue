<script lang="ts" setup>
import { pages } from '~/types/page';
import { useRouter } from 'vue-router'; 

useHead(pages.index.head);
const auth = useAuth();
const router = useRouter();
const schedule = useSchedule();
const value = [new Date()];

const events = computed(() => schedule.data.value || []);

onMounted(async () => {
  await auth.restoreSession(); // 非同期処理を待つ
  
  console.log("セッション復元後の auth.user.value.id : ", auth.user.value.id);
  
  if (!auth.user.value.id) {
    console.log("ないのでログイン ");
    router.push({ name: 'login' });
  } else {
    await schedule.index(auth.user.value.id);   // ユーザーIDに基づいてスケジュールを取得
  }
});

</script>

<template>
  <v-sheet>
    <v-calendar ref="calendar" v-model="value" :events="events"></v-calendar>
  </v-sheet>

  id取れないからtitle uniqueしか現時点では無理．．．
</template>
