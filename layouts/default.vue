<script lang="ts" setup>
useHead({
  titleTemplate: (title) => {
    return title ? `${title} | QH_front` : 'QH_front';
  },
});
</script>

<template>
  <v-app>
    <TheHeader />

    <v-main>
      <v-responsive max-width="1000px" class="mx-auto pa-4">
        <slot />
      </v-responsive>
    </v-main>

    <TheNavigation />
    <TheProgress />
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
</style>
