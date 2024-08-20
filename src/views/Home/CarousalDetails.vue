<template>
    <div class="w-full h-screen">
     
     <div class="h-12 tab_color w-full flex justify-start items-center px-3 text-base font-bold text-white">
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <!-- <div class="">获取首页图片列表</div>
      <div class="flex-none"></div> -->
    </div>
    <div  class="w-full relative carousal_img ">
       <img src="@/assets/loginbg.jpg" alt="" class="w-full h-full">
    </div>
    </div>
</template>

<script setup>
 import { ref, computed, onMounted } from "vue";
import homeApi from "@/network/home.js";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast } from "vant";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute()
const store = useStore();

const article = ref(null)

const goBack = () => {
    router.push('/home')
}

const getHomePageArticle = async (id) => {
  let data = { id: id }; // id will
    showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: 'spinner',
    duration:1000
  });
  try {
    const res = await homeApi.getHomePageArticle(data);
    
    if (res?.data?.success && res?.data?.code == 200) {
      article.value = res?.data?.data?.content
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
//    if(route?.query == undefined || route.query?.id == undefined ||  route?.query == null || route.query?.id == null || route.query?.id == '') return  router.push('/home')
//   getHomePageArticle(route.query.id);
});
</script>

<style scoped>
    .carousal_img{
        height: calc(100vh - 48px);
    }
</style>