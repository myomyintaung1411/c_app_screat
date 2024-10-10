<template>
   <div id="news" class="w-full  h-[calc(100vh_-_68px)]  overflow-y-auto  pb-10 relative">
    <!-- <div
      class="h-12  text-black w-full flex justify-center items-center px-3 text-lg tracking-widest font-bold"
    >
      <div>新闻资讯</div>
    </div> -->
    <van-nav-bar
       :border="false"
       title="新闻资讯"
      
       color="#000" 
      style="background:transparent;font-weight:500 !important;color:#000 !important;"
     />
   
    <section class="px-5 py-3  text-center   ">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      pulling-text="拉动刷新..."
      loosing-text="松动刷新..."
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
        loading-text="加载中..."
      >
        <div v-for="article in articleListData" :key="article?.Id" class="py-3 w-full relative">
            <div @click="goDetails(article?.Id)" class="flex space-x-2  w-full pb-3 border-b border-[#333]  ">
                <div class="w-1/3">
                    <img :src="article?.img_title_url" alt="image" class="h-24 w-36 bg-cover object-cover">
                </div>
                <div class="text-left flex flex-col justify-between text-[#333] w-2/3">
                    <p class="text-sm tracking-wider font-bold van-multi-ellipsis--l3">
                        {{ article?.title }}
                    </p>
                    <p class="text-xs">{{article?.create_at}}</p>
                </div>
            </div>
        </div>
      </van-list>
        </van-pull-refresh>
    </section>
    </div>
            <!-- back to top -->
            <van-back-top  bottom="10vh" style="background:#E24939" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import avatar from "@/assets/avatar.svg";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast } from "vant";
import homeApi from "@/network/home.js";

const router = useRouter();
const route = useRoute();
const active = ref(0);

const articleListData = ref([]);

const pageSize = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const level = ref(null);
const goBack = () => {
  router.push("/team");
};

const onClickTab = async (tab) => {
  window.scrollTo(0, 0);
  // onRefresh();
};

const goDetails = (Id) => {
    router.push({ name: 'NewsDetails', query: { Id: Id } })
}

const getArticleList = async () => {
  let data = {
    pageSize: pageSize.value,
    currentPage: currentPage.value,
  };
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: 'spinner',
    duration:1000
  });
  try {
    const res = await homeApi.getArticleListApi(data);
    console.log(res.data)
    if (res?.data?.success == true && res?.data?.code == 200) {
      loading.value = false;
      totalPage.value = res?.data?.data?.count;
      articleListData.value = [
        ...articleListData.value,
        ...res?.data?.data?.record,
      ];
      console.log(res?.data?.data?.count, "total");
      if (articleListData.value?.length >= parseInt(res?.data?.data?.count)) {
        finished.value = true;
      }
      //articleListData.value = res?.data?.data?.record;
    }else{
      loading.value = false
      refreshing.value = false
      finished.value = true
    }
  } catch (error) {
     loading.value = false
      refreshing.value = false
      finished.value = true
    console.log(error);
  }
};

function onRefresh() {
  // 清空列表数据
  articleListData.value = []; //reset data
  currentPage.value = 0; //reset data
  //   totalPage.value = 1; //reset data
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
}

const onLoad = async () => {
  currentPage.value++;
  if (refreshing.value) {
    articleListData.value = [];
    refreshing.value = false;
  }
  setTimeout(() => {
    getArticleList();
  }, 500);
};

const onCallMethod = async () => {
  window.scrollTo(0, 0);
  onRefresh();
};

onMounted(() => {
  onCallMethod();
});
</script>

<style scoped>
#news :deep() .van-nav-bar__title {
   color:#000 !important
}
#news :deep() .van-nav-bar .van-icon {
   color:#000 !important

}
</style>