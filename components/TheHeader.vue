<script lang="ts" setup>
import { pages } from '~/types/page';
import { useAuth } from '~/composables/useAuth';

const auth = useAuth();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push({ name: 'login' });
};

const goHome = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <v-app-bar class="custom-app-bar">
    <v-app-bar-title>
      <img src="@/assets/images/logo.jpg" height="50" @click="goHome" />
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn variant="text" text="一覧" :to="pages.home.path"></v-btn>
    <v-btn variant="text" text="投稿" :to="pages.edit.path"></v-btn>
    <v-btn variant="text" text="ログアウト" @click="logout"></v-btn>
  </v-app-bar>
</template>

<style scoped>
.custom-app-bar {
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  color: #333;
}

.v-btn {
  font-weight: bold;
  color: #333;
}

.v-app-bar-title img {
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  transition: background-color 0.3s ease;
}
</style>