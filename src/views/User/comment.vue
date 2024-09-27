<template>
     <div id="comment" class="w-full h-screen relative bg-[#B3000A] overflow-y-auto ">
        <!-- <div
      class="h-12 bg-[#B3000A] text-white w-full flex justify-between items-center px-3 text-base font-bold "
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">展示评论区</div>
      <div class="flex-none"></div>
    </div> -->
    <van-nav-bar
        :border="false"
        title="展示评论区"
        left-arrow
        @click-left="goBack"
        color="#fff" 
       style="background: #B3000A;font-weight:500 !important;color:#ffffff !important;"
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
         <div class="py-3 px-3 flex items-center justify-between text-white">
            <span class="text-base">232 条评论 </span>
            <div class="flex items-center">
                <div class="bg-[#df0213] text-white px-2 rounded py-1">最热</div>
            </div>
         </div>
         <section class="py-2 px-3 text-white ">
                <div v-for="n in 4" :key="n" class="flex items-center w-full py-2  justify-between border-b border-[#97000ad2]">
                 <div class="flex  space-x-2 items-start">
                    <img src="@/assets/avatar.svg" alt="userimage" class="w-10" />
                    <div class="flex flex-col space-y-1">
                        <p class="text-base">吃瓜群众</p>
                        <p class="text-sm text-[#e7e5e5]">强烈支持,加油!</p>
                        <p class="text-xs text-[#ff7279]"> 03/12 13:34</p>
                    </div>
                 </div>
                 <div class="flex items-center space-x-2">
                    <p class="text-base">128</p>
                    <div>
                        <van-icon name="like-o" size="20" />
                    </div>
                 </div>
                 </div>
            </section>
            <section class="py-3 px-4 text-white">
             <div class="flex flex-col justify-center   ">
                    <span class=" pt-2 pb-2">上传图片
                    </span>
                <van-uploader
                accept="image/*"
                v-model="frontImage"
                :max-count="1"
                :max-size="5000 * 1024"
                @oversize="onOversize"
                :after-read="frontafterRead"
                />
             </div>
            </section>
            <section class="pb-3 px-4 text-white">
                    <span class="pb-2">选择评论  </span>
               <div v-for="nnn in 3" :key="nnn" class="py-2">
                <div class="w-full border border-white rounded-md p-2">
                    无论是内容还是形式,它都展现出了极高的水准。 无论是内容还是形式,它都展现出了极高的水准。
                </div>
               </div>
            </section>
            <section class="px-4 py-3">
                <van-button   @click="onSubmit"   block   :loading="loading"  :disabled="loading"
               class="back_muli"
             style="
              background-color: #FF4855;
              border: none;
              color: #fff;
              height: 50px;
            "
          >
             确认提交
          </van-button>
        </section>
            <!-- <section v-for="comm in commentData" :key="comm?.id" class="py-3">
                <section class="px-4 w-full border-b border-b-[#700000] ">
                    <div class="flex items-center space-x-3">
                        <img src="@/assets/avatar.svg" alt="userimage" class="w-10">
                        <span class="text-white text-base">{{n}}{{ userInfo?.name }}</span>
                    </div>
                    <div class="py-3 text-white text-sm px-1">
                        <div class="pb-2 pt-1">
                            <p>{{ comm?.title }}</p>
                        </div>
                     <van-row gutter="12">
                        <van-col span="12">
                            <div class=" bg-[#830009] p-2  ">
                                {{ comm?.comment1 }}
                            </div>
                        </van-col>
                        <van-col span="12">
                            <div class=" bg-[#830009] p-2 ">
                                {{ comm?.comment2 }}
                            </div>
                        </van-col>
                        <van-col span="12">
                            <div class=" bg-[#830009] p-2 my-2 ">
                                {{ comm?.comment3}}
                            </div>
                        </van-col>
                        <van-col span="12">
                            <div class=" bg-[#830009] p-2 my-2 ">
                                {{ comm?.comment4 }}
                            </div>
                        </van-col>
                     </van-row>
                    </div>
               </section>
            </section> -->
        </van-list>
        </van-pull-refresh>
    </section>
    <section v-else class="   loginForm mt-0 h-full w-full flex flex-col items-center justify-center overflow-y-auto ">
            <div class="text-white">
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
const frontImage = ref([]);
const frontImageUrl = ref("");

const goBack = () => {
  router.push("/user");
};

const postComment = async () => {
    let data = { username: userInfo?.value?.name, password: passInfo.value};
    try {
    const res = await homeApi.postComment(data);
    console.log('getComment ', res)
    if (res?.data?.success && res?.data?.code == 200) {
     
    }
  } catch (error) {
    console.log(error);
  }
};
async function frontafterRead(file, detail) {
  console.log(file.file, "frontafterRead");
  try {
    showLoadingToast({
      message: "上传中...",
      forbidClick: true,
      duration: 2000,
    });
    // console.log(imageUrl.value);
    let formData = new FormData();
    formData.append("file", file.file); // 因为要上传多个文件，所以需要遍历一下才行
    console.log(formData, "ddd");
    const res = await userApi.UploadImage(formData);
    closeToast();
    // console.log(res);
    if (res?.data?.code == "0") {
      frontImageUrl.value = res?.data?.data?.url;
    }
    console.log(res, "resssssssss");
  } catch (err) {
    frontImage.value = [];
    showToast("图片上传错误");
    console.log(err, "imageupload error");
  }
}

const onOversize = (file) => {
  console.log(file);
  showToast("文件大小不能超过 5MB");
};

const onSubmit = () => {

}

const getComment = async () => {
//     let data = { username: userInfo?.value?.name, password: passInfo.value};
//     try {
//     const res = await homeApi.getComment(data);
//     console.log('getComment ', res)
//     if (res?.data?.success && res?.data?.code == 200) {
     
//     }
//   } catch (error) {
//     console.log(error);
//   }
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
    color:#fff !important
}
#comment :deep() .van-nav-bar .van-icon {
    color:#fff !important

}
</style>