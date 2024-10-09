<template>
    <div class="w-full h-full _bg_main relative">
     
     <div class="h-12 text-black w-full flex justify-between items-center px-3 text-base font-bold ">
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">新闻资讯详情</div>
      <div class="flex-none"></div>
    </div>
    <section class="px-5  overflow-y-auto loginForm  h-[calc(100vh_-_48px)] ">
        
        <div class="py-2 ">
            <img :src="article?.img_title_url" alt="image" class="h-48 w-full object-cover">
        </div>
        <div class="py-2 text-base ">
            {{ article?.title }}
        </div>
        <div class="text-xs text-[#666666]">
            {{ article?.create_at}}
        </div>

        <div class="py-2">
            <section  class="py-2 text-black text-sm">
                <div v-html="article?.content"></div>
           </section>
        </div>

        <div v-if="article?.video_url"  class="w-full py-3 relative h-52">
            <video
            id="register_video " 
            class="register__video__3tV1S bg-cover absolute top-0 cover h-full w-full"
            autoplay loop muted
            preload="auto" width="100%" height="100%"
            playsInline
            >
            <source
                :src="article?.video_url"
                type="video/mp4"
            />
            </video>
        </div>
     
    </section>
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
    router.push('/news')
}

const getArticleDetails = async (Id) => {
  let data = { id: Id }; // id will
    showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: 'spinner',
    duration:1000
  });
  try {
    const res = await homeApi.getArticleDetailsApi(data);
    
    if (res?.data?.success && res?.data?.code == 200) {
      article.value = res?.data?.data
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
   if(route?.query == undefined || route.query?.Id == undefined ||  route?.query == null || route.query?.Id == null || route.query?.Id == '') return  router.push('/news')
  getArticleDetails(route.query.Id);
});
</script>

<style scoped>
._bg_main{
  background-image: url(@/assets/auth/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}

.register_video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;

}

video {
  /* height: 100vh; */
  width: 100%;
  object-fit:cover;
  aspect-ratio: 16 / 9;
  position: absolute;
}
</style>