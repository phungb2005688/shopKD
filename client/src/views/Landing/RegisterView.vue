<template>
  <div class="bg-white p-24 register flex justify-center items-center min-h-0 text-center">
    <form @submit="(e) => register(e)" class="register-box">
      <h1 class="text-black text-2xl font-bold mb-4">ĐĂNG KÝ</h1>
      <div class="box shadow bg-white w-80 border-2 rounded space-y-4 flex flex-col p-5">
        <!-- <input type="text" 
            class="input-field border rounded-xl outline-none px-3 py-2" placeholder="Họ và tên"
          /> -->
        <input type="text" v-model="user.username" class="input-field border rounded-xl outline-none px-3 py-2"
          placeholder="Tên tài khoản" />
        <input type="password" v-model="user.password" class="input-field border rounded-xl outline-none px-3 py-2"
          placeholder="Mật khẩu" />
        <!-- <select  class="border rounded-xl outline-none px-3 py-2">
            <option value="Erkak">Nam</option>
            <option value="Ayol">Nữ</option>
          </select> -->
        <button :disabled="loading"
          class="button bg-gray-500 transition border border-gray-500 text-white rounded p-2 px-4 font-bold
            hover:bg-black hover:border-black disabled:bg-gray-300 disabled:cursor-default disabled:border-none" type="submit">
          Đăng ký
        </button>
      </div>
      <p class="text-sm font-semibold mt-4">
        Bạn đã đăng ký.
        <router-link to="/login" class="text-gray-600 font-bold underline hover:text-black">Đăng nhập</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { reactive, computed } from 'vue';

const store = useStore();
const user = reactive({
  username: "",
  password: "",
});

const loading = computed(() => {
  return store.state.loading;
})

const register = async (e) => {
  e.preventDefault();
  if (!user.username || !user.password) {
    alert("Bạn chưa nhập thông tin!!!");
  } else {
    store.dispatch("auth/register", user);
  }
}
</script>

<style></style>