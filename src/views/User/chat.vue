<template>
  <div class=" relative" style="height: 100vh; width: 100vw;">
    <!-- <div
      style="z-index: 100000"
      class="h-12 bg-[rgba(254,0,0,255)] w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">{{ '在线客服' }}</div>
      <div class="flex-none"></div>
    </div> -->
    <iframe src="https://kefu.sixh001.top?agentid=4a54191c5e57322beaa085f4fab3815c" style="height: calc(100% - 0px); width: 100%; z-index: -1;" />
  </div>
</template>


<script setup>
import { ref,computed,onMounted } from "vue";
import passpng from "@/assets/user/password.svg";
import phonepng from "@/assets/user/phone.svg";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { showToast, showLoadingToast, closeToast } from "vant";
import userApi from "@/network/user.js";
import md5 from "js-md5";
import globaljs from "@/utils/global";

const router = useRouter();
const store = useStore();


const loading = ref(false)

const userInfo = computed(()=> store.getters["app/ProfileInfoData"])

onMounted(()=>{
})

const goBack = () => {
  router.push("/bankcard");
};

</script>


<style scoped>
</style>