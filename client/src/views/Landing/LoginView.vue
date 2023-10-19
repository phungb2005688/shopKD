<template>
    <div class="p-36 login bg-white flex justify-center items-center min-h-0 text-center">
        <form @submit="(e) => login(e)" class="login-box">
            <h1 class="text-black text-2xl font-bold mb-4">ĐĂNG NHẬP</h1>
            <div class="box shadow bg-white w-80 border-2 rounded-xl space-y-5 flex flex-col p-5">
                <input v-model="user.username" type="text" class="input-field border outline-none px-3 py-2 rounded-xl"
                    placeholder="Tên tài khoản" />
                <input v-model="user.password" type="password" class="input-field border outline-none px-3 py-2 rounded-xl"
                    placeholder="Mật khẩu" />
                <button :disabled="loading"
                    class="button bg-gray-500 transition border border-gray-500 text-white rounded p-2 px-4 font-bold
                hover:bg-black hover:border-black disabled:bg-gray-200 disabled:cursor-default disabled:border-none" type="submit">
                    Đăng nhập
                </button>
            </div>
            <p class="text-sm font-semibold mt-4">
                Bạn chưa đăng ký?
                <RouterLink to="/register" class="text-gray-600 font-bold underline hover:text-black">Đăng ký</RouterLink>
            </p>
        </form>
    </div>
</template>
  
<script setup>
import { useStore } from "vuex";
import { reactive, computed } from "vue";

const store = useStore();

const user = reactive({
    username: "",
    password: "",
});

  const loading = computed(() => {
    return store.state.loading;
  });

const login = async (e) => {
    e.preventDefault();
    if (!user.username || !user.password) {
        alert("Bạn chưa nhập thông tin!!!");
    } else {
        store.dispatch("auth/login", user);
    }
};
</script>
  
<style></style>