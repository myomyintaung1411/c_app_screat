<template>
  <div id="teamdetails" class="w-full h-full relative pb-12">
    <div
      class="h-12 tab_color w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">团队详情</div>
      <div class="flex-none"></div>
    </div>
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
        <section class="w-full relative px-2">
          <div class="w-full relative py-3  font-bold">
            <div
              
              class="flex  items-center py-2  bg-white text-[#313131] border-b border-gray-200"
            >
              <div class=" w-1/3 text-center ">真实姓名</div>
              <div class="w-1/3 text-center ">手机号</div>
              <div class="w-1/3 text-center ">注册时间</div>
            </div>
            <div v-if="teamDetailsData?.length > 0" class=" text-white">
              <div>
                <div
                  v-for="teamdata in teamDetailsData"
                  :key="teamdata?.phone"
                  class="flex  font-medium items-center py-2  text-gray-600 border-b bg-white "
                >
                  <div v-if="teamdata?.real_name" class=" w-1/3 text-center">{{ teamdata?.real_name  }}</div>
                  <div v-else class=" w-1/3 text-center text-gray-300">未实名</div>
                  <div class="  w-1/3 text-center">{{ teamdata?.phone }}</div>
                  <div class="  w-1/3 text-center  ">{{ teamdata?.regist_time }}</div>
                </div>
              </div>
            </div>
            <div v-else class="text-black">
              <van-empty
                description="暂无数据"
              />
            </div>
          </div>
        </section>
      </van-list>
    </van-pull-refresh>
          <!-- back to top -->
      <van-back-top  bottom="10vh" style="background:#4286f5" />
  </div>
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

const teamDetailsData = ref([]);

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

const getTeamMemberDetail = async () => {
  let data = {
    level: Number(level.value),
    pageSize: pageSize.value,
    currentPage: currentPage.value,
  };
  try {
    const res = await homeApi.getTeamMemberDetail(data);
    console.log(res.data)
    if (res?.data?.success == true && res?.data?.code == 200) {
      loading.value = false;
      totalPage.value = res?.data?.data?.count;
      teamDetailsData.value = [
        ...teamDetailsData.value,
        ...res?.data?.data?.record,
      ];
      console.log(res?.data?.data?.count, "total");
      if (teamDetailsData.value?.length >= parseInt(res?.data?.data?.count)) {
        finished.value = true;
      }
      //teamDetailsData.value = res?.data?.data?.record;
    }else{
      loading.value = false
      refreshing.value = false
      finished.value = true
    }
  } catch (error) {
    console.log(error);
  }
};

function onRefresh() {
  // 清空列表数据
  teamDetailsData.value = []; //reset data
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
    teamDetailsData.value = [];
    refreshing.value = false;
  }
  setTimeout(() => {
    getTeamMemberDetail();
  }, 500);
};

const onCallMethod = async () => {
  window.scrollTo(0, 0);
  onRefresh();
};

onMounted(() => {
  if (route?.query == undefined || Object.keys(route?.query).length == 0) {
    router.push("/team");
  } else {
    level.value = route?.query?.level;
  }
  onCallMethod();
});
</script>


<style scoped>
#teamdetails :deep() .van-empty__description {
  color: #212121 !important;
  letter-spacing: 2px;
}
</style>