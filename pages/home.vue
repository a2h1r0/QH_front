<script lang="ts" setup>
import { pages } from '~/types/page';
import { useRouter } from 'vue-router'; 

useHead(pages.index.head);
const auth = useAuth();
const router = useRouter();
const schedule = useSchedule();

const value = [new Date()];
const sessionChecked = ref(false);

onMounted(async () => {
  await auth.restoreSession(); // 非同期処理を待つ
  
  // ログイン後にセッションが復元されているか確認
  console.log("セッション復元後の auth.user.value.id : ", auth.user.value.id);
  
  if (!auth.user.value.id) {
    console.log("ないのでログイン ");
    router.push({ name: 'login' });
  } else {
    schedule.index(auth.user.value.id);  // ユーザーIDに基づいてスケジュールを取得
  }
  sessionChecked.value = true;
});


watch(() => sessionChecked.value, (newVal) => {
  if (!newVal) return;
  console.log("セッションチェックが完了しました。");
});

// ログイン後ページなので，nullにはならないはず．とりあえず動くので放置．
// schedule.index(auth.user.value.id);

const events = schedule._data;
</script>

<template>
  <v-sheet>
    <v-calendar ref="calendar" v-model="value" :events="events"></v-calendar>
  </v-sheet>

  id取れないからtitle uniqueしか現時点では無理．．．
</template>
