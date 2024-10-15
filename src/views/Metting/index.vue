<template>
    <div class="w-full h-full relative metting_bg">
        <div
            class="h-12 w-full relative tracking-wider text-center flex items-center justify-center text-black"
            >
            <div @click="goBack" class="absolute left-4">
                <van-icon name="arrow-left" size="23" />
            </div>
            <span class="text-lg font-bold">远景会议</span>
            </div>
        <div class="w-full relative text-white __iframe">
        <div style="" class="relative h-full">
                <iframe
                :src="url"
                scrolling="no"
                seamless="seamless"
                frameborder="0"
                style="overflow: hidden; height: 100%; width: 100%"
                height="100%"
                width="100%"
                >
                </iframe>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted ,reactive} from "vue";
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();
const url = ref('')

const goBack = () => {
  router.push("/user");
};

showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration: 2500,
  });

  if (route?.query !== undefined && route.query?.url !== undefined) {
    url.value = route.query?.url;
  }
</script>


<style scoped>

.metting_bg{
  background-image: url(@/assets/auth/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}

.__iframe {
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow-y: auto;
  /* background: inherit; */
}
</style>