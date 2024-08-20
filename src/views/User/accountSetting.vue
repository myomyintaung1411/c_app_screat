<template>
  <div class="w-full h-full relative">
    <div class="h-12 tab_color w-full flex justify-between items-center px-3 text-base font-bold ">
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">账号设置</div>
      <div class="flex-none"></div>
    </div>
    <div class="w-full  py-2 px-3">

      <div @click="goPage(1)" class="flex justify-between rounded-lg shadow items-center my-1 py-4 bg-white text-black px-5">
        <div class="flex items-center space-x-2">
            <img :src="passpng" alt="password" class="w-7">
            <span class="text-sm tracking-widest">更改密码</span>
        </div>
        <van-icon name="arrow" class="text_color" />
      </div>
      <div @click="goPage(2)" class="flex justify-between rounded-lg shadow items-center my-3 py-4 bg-white text-black px-5">
        <div class="flex items-center space-x-2">
            <img :src="phonepng" alt="password" class="w-7">
            <span class="text-sm tracking-widest">更换手机号</span>
        </div>
        <van-icon name="arrow" class="text_color" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import passpng from "@/assets/user/password.svg";
import phonepng from "@/assets/user/phone.svg";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const goBack = () => {
    router.push('/user')
}

const goPage = (number) => {
    switch (number) {
        case 1:
            router.push('/changepass')
            break;
        case 2:
            router.push('/changephone')
            break;
    
        default:
            break;
    }
}
</script>


<style scoped>
</style>