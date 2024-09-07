<template>
  <div class="w-full h-full relative">
    <div class="h-12 bg-[#fd3130] text-white w-full flex justify-between items-center px-3 text-base font-bold ">
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">个人资料</div>
      <div class="flex-none"></div>
    </div>
    <div class="w-full  py-2 px-3">
      <div class="flex justify-between items-center my-3 py-3 bg-[#f8f8f8]  rounded-lg shadow  px-5">
        <p class="text_color">头像</p>
        <van-image round width="2.5rem" height="2.5rem" :src="avatar" />
      </div>
      <div class="flex justify-between items-center my-3 py-3 bg-[#f8f8f8]  rounded-lg shadow  text-black px-5">
        <p class="text_color">姓名</p>
        <p>{{userInfo?.name}}</p>
      </div>
      <div @click="goEditPhone" class="flex justify-between items-center my-3 py-3 bg-[#f8f8f8]  rounded-lg shadow  text-black pl-5 pr-2">
        <p class="text_color">手机号</p>
       <div class="flex items-center space-x-3 ">
        <p>{{userInfo?.phone}}</p>
        <van-icon name="arrow" color="#000" size="15"  />
       </div>
      </div>
      <div v-if="userInfo.isRealName === 1" class="flex justify-between items-center my-3 rounded-lg  shadow py-3 bg-white  text-black px-5">
        <p class="text_color">实名</p>
        <p>{{userInfo?.true_name}}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref,computed } from "vue";
import avatar from "@/assets/avatar.svg";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const userInfo = computed(()=> store.getters["app/ProfileInfoData"])

const goBack = () => {
    router.push('/user')
}
const goEditPhone = () => {
    router.push('/changephone')
}
</script>


<style scoped>
</style>