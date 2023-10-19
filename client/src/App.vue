<script setup>
  import { useStore } from 'vuex';
  import TheLoading from './components/TheLoading.vue';
  import { computed } from 'vue';

  const store = useStore();
  const loading = computed(() => {
    return store.state.loading
  });
</script>

<template>
  <div class="parent bg-white">
    <TheLoading v-show="loading"></TheLoading>
    <router-view />
  </div>

</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

</style>
