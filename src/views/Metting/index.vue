<template>
    <div class="w-full h-full relative metting_bg">
        <div class="w-full relative text-white __iframe">
        <div style="overflow: hidden !important" class="relative h-full">
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

showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration: 2000,
  });

  if (route?.query !== undefined && route.query?.url !== undefined) {
    url.value = route.query?.url;
  }
</script>


<style scoped>
.metting_bg{
  height: calc(100vh - 68px);
  overflow-y: auto;
  width: 100%;
}

.__iframe {
  height: calc(100vh - 68px);
  width: 100%;
  position: relative;
  overflow-y: auto;
  /* background: inherit; */
}
</style>