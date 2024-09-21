<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <v-app>
    <TheHeader v-if="route.path !== '/register' && route.path !== '/login'" />

    <v-main>
      <v-responsive max-width="1000px" min-height="100vh" class="mx-auto pa-4">
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

  .v-responsive
    background-color #f3f4f6
</style>
