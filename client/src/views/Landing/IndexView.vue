<template>
  <div class="landing min-h-0 w-full flex flex-col justify-center items-center">
    <div class="bg-white min-w-[400px] text-center rounded p-44">
      <h1 class="landing-title font-bold text-black text-3xl">Chào mừng đến với cửa hàng giày của chúng tôi</h1>
      <p class="landing-desc mt-4 opacity-70">
        Xin chào những người đăng ký và những người xem kênh của chúng tôi.
        Trong video này và các video tiếp theo, chúng ta sẽ tìm hiểu cách xây dựng một ứng dụng cửa hàng
        giày trực tuyến từ đầu bằng cách sử dụng các công nghệ MongoDB, Express, Vuejs và Nodejs.
      </p>
      <div class="landing-links mt-8">
        <RouterLink to="/register" 
        class="bg-white transition border border-white text-black rounded p-2 px-5 hover:bg-black hover:border-black hover:text-white font-bold">Đăng ký</RouterLink> |
        <RouterLink to="/login" class="bg-white transition text-gray-600 rounded p-2 px-4 hover:bg-black hover:border-black hover:text-gray-300 font-bold">Đăng nhập</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

// const store = useStore()
// console.log(store.auth.state);
</script>

<style></style>