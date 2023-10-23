<script setup>
import { useStore } from 'vuex';
import TheLoading from './components/TheLoading.vue';
import TheToast from './components/TheToast.vue';
import { computed } from 'vue';

const store = useStore();
const loading = computed(() => {
  return store.state.loading
});

const toastShow = computed(() => {
  return store.state.toast.show
});

</script>

<template>
  <div class="parent bg-white">
    <TheLoading v-show="loading"></TheLoading>
    <TheToast v-show="toastShow"></TheToast>
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
