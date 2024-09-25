<template>
     <div class="w-full h-full relative overflow-y-hidden">
        <div
      class="h-12 bg-[#B3000A] text-white w-full flex justify-between items-center px-3 text-base font-bold "
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">展示评论区</div>
      <div class="flex-none"></div>
    </div>
    <section class="   loginForm mt-0 bg-[#B3000A] h-[calc(100vh_-_48px)] flex flex-col overflow-y-auto ">
       <section v-for="n in 8" :key="n" class="py-3">
        <section class="px-4 w-full border-b border-b-[#700000] ">
        <div class="flex items-center space-x-3">
            <img src="@/assets/avatar.svg" alt="userimage" class="w-10">
            <span class="text-white text-base">{{n}}{{ userInfo?.name }}</span>
        </div>
        <div class="py-2 text-white text-sm">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas consequuntur magni modi eligendi expedita quidem at, voluptates obcaecati debitis. Vel veniam distinctio id totam blanditiis minima velit, dolorum error repellendus!</p>
        </div>
       </section>
       </section>
    </section>
    </div>
</template>


<script setup>
import { ref,computed,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { showToast, showLoadingToast, closeToast } from "vant";
import homeApi from "@/network/home.js";
import globaljs from "@/utils/global";

const router = useRouter();
const store = useStore();

const userInfo = computed(()=> store.getters["app/ProfileInfoData"])
const passInfo = computed(()=> store.getters["app/PasswordInfo"])

onMounted(()=>{
    getComment()
})

const goBack = () => {
  router.push("/user");
};

const postComment = async () => {
    let data = { username: userInfo?.value?.name, password: passInfo.value};
    try {
    const res = await homeApi.postComment(data);
    console.log('getComment ', res)
    if (res?.data?.success && res?.data?.code == 200) {
      carousalImage.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
const getComment = async () => {
    let data = { username: userInfo?.value?.name, password: passInfo.value};
    try {
    const res = await homeApi.getComment(data);
    console.log('getComment ', res)
    if (res?.data?.success && res?.data?.code == 200) {
      carousalImage.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};



</script>


<style scoped>
</style>