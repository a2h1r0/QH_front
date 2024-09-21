<script lang="ts" setup>
import { pages } from '~/types/page';

useHead(pages.index.head);
const auth = useAuth();
const schedule = useSchedule();

const value = [new Date()];

// ログイン後ページなので，nullにはならないはず．とりあえず動くので放置．
schedule.index(auth.user.value.id);

const events = schedule._data;
</script>

<template>
  <v-sheet>
    <v-calendar ref="calendar" v-model="value" :events="events"></v-calendar>
  </v-sheet>

  id取れないからtitle uniqueしか現時点では無理．．．
</template>
