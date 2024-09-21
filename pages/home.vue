<script lang="ts" setup>
import { pages } from '~/types/page';

useHead(pages.index.head);
const schedule = useSchedule();

schedule.index();
</script>

<template>
  <div v-for="schedule in schedule.data">{{ schedule }}</div>
</template>
