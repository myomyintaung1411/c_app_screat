<template>
  <div id="enveloperecord" class="w-full h-full relative pb-12">
    <div
      class="h-12 tab_color w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">打卡领取记录</div>
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
        <section class="w-full relative ">
          <div class="w-full relative py-3 px-2 font-bold">
            <div
            
              class="flex justify-between  items-center py-2 px-3 bg-white text-[#313131] border-b border-gray-200"
            >
              <div class="">日期</div>
              <!-- <div class="">日期</div> -->
              <div class="">打卡</div>
            </div>

            <div v-if="envelopeRecord?.length > 0" class="bg-white ">
              <div>
                <div
                  v-for="envelope in envelopeRecord"
                  :key="envelope?.Id"
                  class="flex justify-between font-medium items-center py-2 px-3 bg-white text-black "
                >
                  <div class="w-1/2 text-left text-gray-600">{{ envelope?.create_at }}</div>
                  <div class="w-1/4 text-left text-gray-600 ">领取</div>
                  <div class="w-1/4 text-right text_color">{{ envelope?.redpack_money }} ￥</div>
                  
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

const envelopeRecord = ref([]);

const pageSize = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const goBack = () => {
  router.push("/envelope");
};

const getRedpackRecord = async () => {
  let data = {
    pageSize: pageSize.value,
    currentPage: currentPage.value,
  };
  try {
    const res = await homeApi.getRedpackRecord(data);
    //showToast(res?.data?.msg);
    if (res?.data?.success == true && res?.data?.code == 200) {
      loading.value = false;
      totalPage.value = res?.data?.data?.count;
      envelopeRecord.value = [
        ...envelopeRecord.value,
        ...res?.data?.data?.record,
      ];
      console.log(res?.data?.data?.count, "total");
      if (envelopeRecord.value?.length >= parseInt(res?.data?.data?.count)) {
        finished.value = true;
      }
      //envelopeRecord.value = res?.data?.data?.record;
    }
  } catch (error) {
    console.log(error);
  }
};

function onRefresh() {
  // 清空列表数据
  envelopeRecord.value = []; //reset data
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
    envelopeRecord.value = [];
    refreshing.value = false;
  }
  setTimeout(() => {
    getRedpackRecord();
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
#enveloperecord :deep() .van-empty__description {
  color: #212121 !important;
  letter-spacing: 2px;
}
</style>