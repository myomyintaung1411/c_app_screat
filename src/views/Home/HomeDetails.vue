<template>
    <div class="w-full h-full">
     
     <div class="h-12 tab_color w-full flex justify-between items-center px-3 text-base font-bold text-white">
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">获取首页图片列表</div>
      <div class="flex-none"></div>
    </div>
    <div  class="py-3 px-3 w-full relative mt-10 text-black">
        
            <section  class="py-2">
                <div v-html="article"></div>
    </section>
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
   if(route?.query == undefined || route.query?.id == undefined ||  route?.query == null || route.query?.id == null || route.query?.id == '') return  router.push('/home')
  getHomePageArticle(route.query.id);
});
</script>