<template>
  <div class="w-full h-full text-center  relative home_bg   " >
    <section class="h-48 w-full ">
      <img src="@/assets/loginbg.jpg" alt="loginbg" class="w-full h-full relative">
    </section>
    <!-- <section class="py-5 px-3 w-full relative">
      <div class="h-10 bg-white w-56"></div>
      <div class="py-2 flex items-center justify-between">
        <div class="text-white text-base flex-1 max-w-[70%] text-left">
          Now You are Member ship Level1 and complete tasks and win 2 million prizes.
        </div>
        <div>
          <van-circle
          v-model:current-rate="currentRate"
          :rate="70"
          :stroke-width="100"
          layer-color="#f8e29b"
          color="#febf32"
        >
        <template #default>
          <div class=" text-white w-full h-full   p-4  ">
             <div class="bg-[#febf32] w-full h-full  rounded-full flex items-center justify-center text-white font-bold text-lg">
             {{currentRate}} %
             </div>
          </div>
        </template>
          </van-circle>
        </div>
      </div>
      <section class="py-2 w-full px-1 space-y-5">
        <div class="h-11 rounded-lg w-full bg-[#0f2a57] text-[#febf32] flex items-center justify-between px-4 text-base">
          <span>任务 1号</span>
          <van-icon name="arrow" color="#febf32" size="20"  />
        </div>
        <div class="h-11 rounded-lg w-full bg-[#0f2a57] text-[#febf32] flex items-center justify-between px-4 text-base">
          <span>任务 2号</span>
          <van-icon name="arrow" color="#febf32" size="20"  />
        </div>
        <div class="h-11 rounded-lg w-full bg-[#0f2a57] text-[#febf32] flex items-center justify-between px-4 text-base">
          <span>任务 3号</span>
          <van-icon name="arrow" color="#febf32" size="20"  />
        </div>
        <div class="h-11 rounded-lg w-full bg-[#0f2a57] text-[#febf32] flex items-center justify-between px-4 text-base">
          <span>任务 4号</span>
          <van-icon name="arrow" color="#febf32" size="20"  />
        </div>
      </section>
    </section> -->
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import homeApi from "@/network/home.js";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import { useStore } from "vuex";


const router = useRouter();
const store = useStore();

const imageShow = ref(false)
const imageurl = ref([])

const currentRate = ref(70);
    const text = computed(() => currentRate.value.toFixed(0) + '%');


const gameAddressList = ref(null);
const carousalImage = ref(null);
const noticeList = ref(null);

const loginInfo = computed(() => store.getters["app/LoginData"]);
const loading = ref(false);

//The list of pictures in the middle, click to enter and browse the article
const goDetail = (id) => {
  router.push({ name: "HomeDetails", query: { id: id } });
};
const goCarousal = () => {
  router.push({ name: "HomeDetails" });
};

// const showImage = (image) => {
//    image = `https://sxh-cn.oss-cn-hongkong.aliyuncs.com/${image}`
//    imageurl.value = [image]
//   imageShow.value = true
// }

const showImage = (image) => {
  image = `https://sxh-cn.oss-cn-hongkong.aliyuncs.com/${image}`
  if (image == null) return showToast("没有可用的图像");
  showImagePreview({
    closeable: true, 
    images: [image],
    className:'showImageClass',
    onClose() {
    },
  });
};

const onRefresh = () => {
  setTimeout(() => {
   // showToast("刷新成功");
    getHomePageArticleList();
    getNotice();
    getHomePageRotograph();
    loading.value = false;
  }, 1000);
};

const getHomePageArticleList = async () => {
  try {
    const res = await homeApi.getHomePageArticleList();
    if (res?.data?.success && res?.data?.code == 200) {
      gameAddressList.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getNotice = async () => {
  try {
    const res = await homeApi.getNotice();
    if (res?.data?.success && res?.data?.code == 200) {
      noticeList.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

//for carousalImage
const getHomePageRotograph = async () => {
  let data = { address: 1 };
  try {
    const res = await homeApi.getHomePageRotograph(data);
    console.log('cccccccccccc ', res)
    if (res?.data?.success && res?.data?.code == 200) {
      carousalImage.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getHomePageRotograph();
  getHomePageArticleList();
  getNotice();
});
</script>


<style scoped>
.home_bg{
  height: calc(100vh - 68px);
  /* background: #f; */
  overflow-y: auto;
  background: #050a30;
}

</style>