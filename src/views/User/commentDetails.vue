<template>
     <div id="comment" class="w-full h-screen relative  _bg_main pb-20 overflow-y-auto ">
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
        :title="commentSingle ? commentSingle?.title : '展示评论区'"
        left-arrow
        @click-left="goBack"
        color="#000" 
       style="background:transparent;font-weight:500 !important;color:#000 !important;"
      />
    
    <section  class="    mt-0  flex flex-col  ">
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
         <div class="py-3 px-3 flex items-center justify-between text-[#333333]">
            <span class="text-base">{{totalPage}} 条评论 </span>
            <!-- <div class="flex items-center">
                <div class="bg-[#df0213] text-white px-2 rounded py-1">最热</div>
            </div> -->
         </div>
         <section class="py-2 px-3 text-[#333333] ">
                <div v-for="com in commentData" :key="com?.Id" class="flex items-center w-full py-2  justify-between border-b border-[#999]">
                 <div class="flex  space-x-2 items-start">
                    <img v-if="com?.img" :src="com?.img" alt="userimage" class="w-10" />
                    <div v-else class="w-8 h-8 rounded-full bg-[#FF5C24]"></div>
                    <div class="flex flex-col space-y-1">
                        <p class="text-base">{{com?.title}}</p>
                        <p class="text-sm text-[#333333]">{{com?.text}}</p>
                        <p class="text-xs text-[#999999]"> {{ formatDate(com?.stime) }}</p>
                    </div>
                 </div>
                 <!-- <div class="flex items-center space-x-2">
                    <p class="text-base">128</p>
                    <div>
                        <van-icon name="like-o" size="20" />
                    </div>
                 </div> -->
                 </div>
            </section>
            <!-- <section class="py-3 px-4 text-[#333333]">
             <div class="flex flex-col justify-center   ">
                    <span class=" pt-2 pb-2">上传图片
                    </span>
                <van-uploader
                accept="image/*"
                v-model="frontImage"
                :max-count="1"
                :max-size="10000 * 1024"
                @oversize="onOversize"
                :after-read="frontafterRead"
                />
             </div>
            </section> -->
            <section class="pb-3 pt-3 px-4 text-[#333333]">
                    <span class="pb-2 pl-4 font-bold">发表评论  </span>
               <!-- <div v-for="nnn in 4" :key="nnn" class="py-2" @click="SelectComment(nnn)">
                <div class="w-full bg-white rounded-md p-2 relative" :class="comment_select === nnn ? 'border-2 border-[#999]' : 'border border-white'">
                    <div class="absolute -left-3 bg-[#f3cc90] text-[#96000b] w-8 h-8 flex items-center justify-center rounded-full">
                     {{nnn}}
                    </div>
                    <p v-if="nnn === 1" class="pl-8">
                      {{ commentSingle?.comment1 }}
                    </p>
                    <p v-else-if="nnn === 2" class="pl-8">
                      {{ commentSingle?.comment2 }}
                    </p>
                    <p v-else-if="nnn === 3" class="pl-8">
                      {{ commentSingle?.comment3 }}
                    </p>
                    <p v-else class="pl-8">
                      {{ commentSingle?.comment4 }}
                    </p>
                </div>
               </div> -->
               <div
              class="w-full flex items-center relative px-4 rounded-lg h-14 white_color border-gray-300 border mt-1"
            >
              <div
                class=" w-full h-full text-sm flex justify-center items-center relative"
              >
                <input
                  v-model="comment"
                  autocomplete="off"
                  placeholder="请输入您的主题"
                  class="input-name text-[#000] bg-transparent  border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-600 placeholder:tracking-widest"
                  type="text"
                />
              </div>
            </div>
              </section>
            <section class="px-4 py-3">
                <van-button   @click="onSubmit"   block   :loading="subLoading"  :disabled="subLoading"
               class="back_muli"
             style="
              background-color: #E24939;
              border: none;
              color: #fff;
              height: 50px;
            "
          >
             确认提交
          </van-button>
        </section>

        </van-list>
        </van-pull-refresh>
             <!-- back to top -->
    <van-back-top  bottom="30vh" style="background:#E24939" />
    </section>
    <!-- <section v-else class="   loginForm mt-0 h-full w-full flex flex-col items-center justify-center overflow-y-auto ">
            <div class="text-white">
                <van-empty
                description="暂无数据"
              />
            </div>
    </section> -->
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
import avatar from "@/assets/avatar.svg";

const router = useRouter();
const route = useRoute()
const store = useStore();

const userInfo = computed(()=> store.getters["app/ProfileInfoData"])
const passInfo = computed(()=> store.getters["app/PasswordInfo"])
const BaseImageUrl = computed(() => store.getters["app/BaseImageUrl"]);
const comment = ref('')
const pageSize = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);
const loading = ref(false);
const subLoading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const commentData = ref([])
const frontImage = ref([]);
const frontImageUrl = ref("");
const id = ref('')
const comment_select = ref(0)
const commentSingle = ref(null)

const goBack = () => {
  router.push("/comment");
};

const formatDate = (date) => {
  return dayjs(date).format('MM/DD HH:mm')
}

const SelectComment = (index) => {
  comment_select.value = index
}

const postComment = async () => {
  if(userInfo?.value?.isCanComment == 0) return
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
  showToast("文件大小不能超过 10MB");
};

const onSubmit  = async () => {
   if(comment.value == '') return showToast('请输入您的主题')
  // if(comment_select.value == 0) return showToast('請選擇评论')
  // let comment_index = ''
  // if(comment_select.value == 1) comment_index = commentSingle?.value?.comment1
  // if(comment_select.value == 2) comment_index = commentSingle?.value?.comment2
  // if(comment_select.value == 3) comment_index = commentSingle?.value?.comment3
  // if(comment_select.value == 4) comment_index = commentSingle?.value?.comment4
  let data = { id: commentSingle?.value?.id, content:comment.value};
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
  }); 
  subLoading.value = true;
  try {
   
    const res = await homeApi.postComment(data);

    subLoading.value = false;
    console.log('getComment ', res)
    showToast({ message: res?.data?.msg, duration: 2000 });
    if (res?.data?.success && res?.data?.code == 200) {
      comment_select.value = 0
      frontImageUrl.value = ''
      frontImage.value = []
      onRefresh()
    }
  } catch (error) {
    subLoading.value = false;
    console.log(error);
  }
}

const getPeopleComment = async () => {
  let data = {
    pageSize: pageSize.value,
    currentPage: currentPage.value,
    comment_index:commentSingle?.value?.id
  };
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
  });
  try {
    const res = await homeApi.getPeopleComment(data);
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
    getPeopleComment();
  }, 500);
};

const onCallMethod = async () => {
  window.scrollTo(0, 0);
  onRefresh();
};


onMounted(() => {
  if(route.query.comm){
    commentSingle.value = JSON.parse(route.query.comm)

  }
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