<template>
    <div class="h-screen sm:h-auto">
      <div class="sm:mt-[74px] h-full sm:h-auto flex flex-col justify-center items-center relative">
        <div class="h-[307px] w-[307px] bg-[#13151b] rounded-full">
          <div class="h-full w-full flex justify-center items-center">
            <img src="@/assets/404.webp" alt="" class="w-[213px] h-[82px]" draggable="false" loading="lazy">
          </div>
        </div>
        <p class="pt-5 text_color text-xl tracking-wider text-center">出错啦，您访问的页面无法连接！</p>
        <router-link to="/" class="py-3 flex items-center space-x-2 text-white text-[18px]">
          <p>联系客服</p>
          <van-icon name="arrow" />
        </router-link>
        <div class="py-3 w-[200px] ">
          <div  class="btn_login text-center py-3 cursor-pointer text-lg text-white">
            <van-button @click="goService" block  hairline color="#AD8E58">联系客服</van-button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter()

  const goService = () => {
      router.push('/')
  }
  
  </script>