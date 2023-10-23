<template>
    <div>
        <nav class="navbar sticky top-0 left-0 p-3 bg-white flex flex-row items-center justify-between border-b">
            <router-link to="/explore" class="text-lg font-medium">HOME</router-link>
            <div class="search">
                <input type="text" placeholder="Tìm kiếm...." 
                    class=" outline-none border rounded-md pl-4 px-32  py-2.5 ">
            </div>
            <div class="links space-x-6">
                <router-link to="#!" class="text-3xl">
                    <ion-icon name="cart-outline"></ion-icon>
                </router-link>
                <router-link to="/explore/account" class="text-3xl">
                    <ion-icon name="person-outline"></ion-icon>
                </router-link>
            </div>
            
        </nav>
        <router-view></router-view>

    </div>
</template>

<script>
export default {

};
</script>

<style>
ion-icon {
  --ionicon-stroke-width: 36px;
}

</style>