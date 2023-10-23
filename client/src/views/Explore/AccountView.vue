<script setup>
import Cookies from "js-cookie";
import { computed, reactive } from 'vue';
import api from "@/helpers/api";
import { useStore } from "vuex";

const store = useStore()
const loading = computed(() => {
    return store.state.loading;
})
const account = reactive(JSON.parse(Cookies.get("account")));

const updateUser = async () => {
    store.commit( "setLoading", true, { root: true });
    try {
        const res = await api.put(`/accounts/${account._id}`, { account });
        
        Cookies.remove("account");
        Cookies.set("account", JSON.stringify(res.data.account));
        
        store.commit( "setLoading", false, { root: true })
        store.commit( 
            "setToast",
            { show: true, msg: res.data.msg, type: "success" },
            { root: true }
        );
        
        setTimeout(() => {
            window.location.reload();
        }, 2000);

    } catch (error) {
        store.commit( "setLoading", false, { root: true })
        store.commit( 
            "setToast",
            {show: true, msg: error.message, type: "error" },
            { root: true }
        );        
    }
};

const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("account");
    window.location.reload();
}

const deleteAccount = async () =>{
    store.commit( "setLoading", true, { root: true });
    try {
        const res = await api.delete(`/accounts/${account._id}`);
        
        Cookies.remove("account");
        Cookies.remove("token");
        
        store.commit( "setLoading", false, { root: true })
        store.commit( 
            "setToast",
            { show: true, msg: res.data.msg, type: "success" },
            { root: true }
        );
        
        setTimeout(() => {
            window.location.reload();
        }, 2000);

    } catch (error) {
        store.commit( "setLoading", false, { root: true })
        store.commit( 
            "setToast",
            {show: true, msg: error.message, type: "error" },
            { root: true }
        );        
    }
}
</script>
<template>
    <div class="account-page min-h-0 flex justify-center items-start bg-white">
        <div class="account pt-12 flex justify-center items-center space-x-7">
            <div class="account-img shadow-lg w-50 bg-gray-50">
                <img class="w-full object-cover rounded"
                    :src="`https://api.dicebear.com/7.x/big-smile/svg?seed=${account.fullname}`" alt="">
            </div>
            <!-- https://api.dicebear.com/7.x/initials/svg?seed=Oliver -->
            <div class="account-content">
                <div class="input-field w-full mt-4 flex flex-col items-start">
                    <label for="fullname">Họ tên</label>
                    <input id="fullname" v-model="account.fullname" type="text"
                        class="outline-none border rounded px-6 py-2 w-full">
                </div>
                <div class="input-field w-full mt-4 flex flex-col items-start">
                    <label for="username">Tên tài khoản</label>
                    <input id="username" v-model="account.username" type="text"
                        class="outline-none border rounded px-6 py-2 w-full">
                </div>

                <div class="input-field w-full mt-4 flex flex-col items-start">
                    <select v-model="account.gender" class="outline-none border rounded px-6 py-3 w-full">
                        <option :selected="account.gender === 'Nam'" value="Nam">Nam</option>
                        <option :selected="account.gender === 'Nữ'" value="Nữ">Nữ</option>
                    </select>
                </div>
                <div class="input-field w-full mt-4 flex flex-col items-start">
                    <label for="age">Tuổi</label>
                    <input id="age" v-model="account.age" type="text" placeholder="Nhập tuổi của bạn!"
                    class="outline-none border rounded px-6 py-2 w-full">
                </div>
                <div class="input-field w-full mt-4 flex flex-col items-start">
                    <label for="phone">Số điện thoại</label>
                    <input id="phone" v-model="account.phone" type="text" placeholder="Nhập số điện thoại!"
                    class="outline-none border rounded px-6 py-2 w-full">
                </div>
                <div class="input-field w-full mt-4 flex flex-col items-start">
                    <label for="address">Địa chỉ</label>
                    <input id="address" v-model="account.address" type="text" placeholder="Nhập địa chỉ của bạn!"
                    class="outline-none border rounded px-6 py-2 w-full">
                </div>
            </div>
        </div>
    </div>
    <div class="account-page pt-10 min-h-0 items-start bg-white">
        <div class="account-buttons flex justify-center mt-6 items-center space-x-10">
            <div class="left">
                <button @click="updateUser()"
                    :disabled="loading"
                    class="save-btn transition disabled:bg-gray-200 hover:bg-green-600 hover:border-gray-200 hover:text-white px-5 py-2 mr-36 rounded-xl border-2 bg-white text-black">
                    Lưu thay đổi</button>
            </div>
            <div class="right">
                <button @click="logOut()" 
                    :disabled="loading"
                    class="logout-btn transition hover:bg-black px-4 py-2 rounded bg-gray-400 text-white mr-10 disabled:bg-gray-200">Đăng xuất</button>
                <button @click="deleteAccount()"
                    :disabled="loading"
                    class="delete-btn transition hover:bg-red-600 px-4 py-2 rounded bg-red-400 text-white disabled:bg-gray-200">Xóa</button>
            </div>
        </div>
    </div>
                
</template>



<style scoped></style>