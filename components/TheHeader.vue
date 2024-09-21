<script lang="ts" setup>
import { pages } from '~/types/page';
</script>

<template>
  <v-app-bar>
    <v-app-bar-title>QH_front</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn variant="text" text="ログイン" :to="pages.login.path"></v-btn>
    <v-btn variant="text" text="一覧" :to="pages.home.path"></v-btn>
    <v-btn variant="text" text="投稿" :to="pages.edit.path"></v-btn>
  </v-app-bar>
</template>
