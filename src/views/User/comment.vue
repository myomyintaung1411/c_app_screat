<template>
    <div id="comment" class="w-full h-screen relative _bg_main  overflow-y-auto ">

   <van-nav-bar
       :border="false"
       title="展示评论区"
       left-arrow
       @click-left="goBack"
       color="#000" 
      style="background:transparent;font-weight:500 !important;color:#000 !important;"
     />
   
   <section v-if="commentData?.length > 0" class="    mt-0  flex flex-col  ">
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



       
           <section v-for="comm in commentData" :key="comm?.id" class="py-3">
               <section @click="goDetails(comm)" class="px-4 w-full ">
                <div class="border-b border-b-[#333333] pb-2 ">
                    <div class="py-1 text-[#333333] text-sm px-1">
                       <div class="py-1 w-full text-base">
                           <p class="font-bold text-base">{{ comm?.title }}</p>
                           <p class="text-sm">{{ comm?.comment1 }} {{ comm?.comment2 }}  {{ comm?.comment3 }} {{ comm?.comment4 }}</p>
                       </div>
                   </div>
                   <div class="flex items-center justify-between text-[#666666] text-sm">
                    <span>{{ formatDate(comm?.create_at) }} </span>
                    <div class="flex items-center space-x-1 text-[#333333]">
                        <van-icon name="eye-o" size="20" />
                        <span>{{ comm?.comment_count }}</span>
                    </div>
                   </div>
                </div>
              </section>
           </section>
       </van-list>
       </van-pull-refresh>
   </section>
   <section v-else class="   loginForm mt-0 h-full w-full flex flex-col items-center justify-center overflow-y-auto ">
           <div class="text-[#000]">
               <van-empty
               description="暂无数据"
             />
           </div>
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
import userApi from "@/network/user.js";
import dayjs from 'dayjs'

const router = useRouter();
const store = useStore();

const userInfo = computed(()=> store.getters["app/ProfileInfoData"])
const passInfo = computed(()=> store.getters["app/PasswordInfo"])
const pageSize = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const commentData = ref([])

const goBack = () => {
 router.push("/user");
};

const formatDate = (date) => {
  return dayjs(date).format('MM/DD HH:mm')
}

const goDetails = (comm) => {
    router.push({ name: 'commentDetails', query: { comm: JSON.stringify(comm) } })
}

const getComment = async () => {
 let data = {
   pageSize: pageSize.value,
   currentPage: currentPage.value,
 };
 showLoadingToast({
   message: "加载中...",
   forbidClick: true,
   loadingType: "spinner",
 });
 try {
   const res = await homeApi.getComment(data);
   console.log(res.data)
   if (res?.data?.success == true && res?.data?.code == 200) {
     loading.value = false;
     totalPage.value = res?.data?.data?.count;
     commentData.value = [
       ...commentData.value,
       ...res?.data?.data?.record,
     ];
     console.log(res?.data?.data?.count, "total");
     if (commentData.value?.length >= parseInt(res?.data?.data?.count)) {
       finished.value = true;
     }
     //commentData.value = res?.data?.data?.record;
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
 commentData.value = []; //reset data
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
   commentData.value = [];
   refreshing.value = false;
 }
 setTimeout(() => {
   getComment();
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


<style scoped >
#comment :deep() .van-nav-bar__title {
   color:#000 !important
}
#comment :deep() .van-nav-bar .van-icon {
   color:#000 !important

}
._bg_main{
  background-image: url(@/assets/auth/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
</style>