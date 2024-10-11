<template>
    <div class="w-full h-screen relative _bg_main overflow-y-auto">
      <div
        class="h-12  text-black w-full flex justify-between items-center px-3 text-base font-bold"
      >
        <div @click="goBack" class="">
          <van-icon name="arrow-left" />
        </div>
        <div class="">充值</div>
        <div class="flex-none"></div>
      </div>

      <div v-if="info_data"  style="overflow: hidden !important" class="__iframe">
        <iframe  :src="info_data?.url"  scrolling="no" seamless="seamless"  frameborder="0" 
        style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"></iframe>
    </div>

    </div>
  </template>
  
  
  
  
  <script setup>
  import { ref,computed,onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useStore } from "vuex";
  import { showToast, showLoadingToast, closeToast } from "vant";
  import homeApi from "@/network/home.js";
  import globaljs from "@/utils/global";
  import userApi from "@/network/user.js";
  
  const router = useRouter();
  const route = useRoute()
  const store = useStore();
 const info_data = ref(null)
  
  const goBack = () => {
  router.push("/home");
  };
  
  
  const reCharge = async () => {

  }
  

  onMounted(() => {
    showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration:2000
  });
      if(route.query?.info){
        info_data.value = JSON.parse(route.query?.info)
    }
  });
  

  

  </script>
  
  
  <style scoped >
          .__iframe {
          height: calc(100% - 48px);
          width: 100%;
          position: relative;
          background: inherit;
        }

  #payqrPage :deep() .van-nav-bar__title {
  color:#fff !important
  }
  #payqrPage :deep() .van-nav-bar .van-icon {
  color:#fff !important
  
  }
  ._bg_main{
  background-image: url(@/assets/auth/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
  </style>