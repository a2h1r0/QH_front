<script lang="ts" setup>
import type { NuxtError } from '#app';

const router = useRouter();

const props = defineProps({
  error: Object as () => NuxtError,
});

onMounted(() => {
  if (props.error?.statusCode === 403) {
    setTimeout(
      async () =>
        await navigateTo('https://qh-front.netlify.app/', {
          external: true,
        }),
      5000
    );
  }
});
</script>

<template>
  <v-responsive
    height="100vh"
    max-width="100vw"
    class="d-flex align-center text-center pa-4"
  >
    <h1 class="text-h1 text-white font-weight-black">
      {{ error?.statusCode || 500 }}
    </h1>
    <p class="text-h5 text-white mt-4">
      {{ error?.message || 'エラーが発生しました．．．' }}
    </p>

    <p class="text-body-1 text-white mt-8" v-if="error?.statusCode === 403">
      5秒後にトップページへリダイレクトします．．．
    </p>
    <v-btn
      color="success"
      class="mt-12"
      @click="router.push({ path: '/' })"
      v-else
    >
      戻る
    </v-btn>
  </v-responsive>
</template>

<style lang="stylus" scoped>
.v-responsive
  background-color #2f3242
</style>
