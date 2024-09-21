<script lang="ts" setup>
import { pages } from '~/types/page';

useHead(pages.index.head);

const auth = useAuth();
</script>

<template>ログインしてるやつ：{{ auth.user }}</template>
