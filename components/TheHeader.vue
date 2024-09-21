<script lang="ts" setup>
import { pages } from '~/types/page';
import { useAuth } from '~/composables/useAuth'; 

const auth = useAuth();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push({ name: 'login' });
};
</script>

<template>
  <v-app-bar>
    <v-app-bar-title>QH_front</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn variant="text" text="一覧" :to="pages.home.path"></v-btn>
    <v-btn variant="text" text="投稿" :to="pages.edit.path"></v-btn>
    <v-btn variant="text" text="ログアウト" @click="logout"></v-btn>
  </v-app-bar>
</template>
