<script lang="ts" setup>
import { pages } from '~/types/page';

const route = useRoute();
const router = useRouter();
const auth = useAuth();

const isLoginURL = () => route.path === '/register' || route.path === '/login';

watchEffect(() => {
  if (auth.user.value.id === null && !isLoginURL()) {
    router.push({ path: pages.login.path });
  } else if (auth.user.value.id !== null && isLoginURL()) {
    router.push({ path: pages.home.path });
  }
});

if (route.path === '/') {
  router.push({ path: pages.home.path });
}
</script>

<template>
  <v-app>
    <TheHeader v-if="!isLoginURL()" />

    <v-main>
      <v-responsive class="mx-auto">
        <slot />
      </v-responsive>
    </v-main>
  </v-app>
</template>

<style lang="stylus">
fonts = 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro', 'Yu Gothic Medium', '游ゴシック Medium', YuGothic, '游ゴシック体', 'メイリオ', sans-serif

::-webkit-scrollbar
  width 10px

::-webkit-scrollbar-track
  border-radius 10px
  box-shadow inset 0 0 6px rgba(0, 0, 0, 0.1)

::-webkit-scrollbar-thumb
  background-color #c0c0c0
  border-radius 10px
  box-shadow 0 0 0 1px rgba(255, 255, 255, 0.3)

body
  font-family fonts !important
  [class^='text-']
    font-family fonts !important
  color #5D5D5D

  .v-main
    background-color #f3f4f6
</style>
