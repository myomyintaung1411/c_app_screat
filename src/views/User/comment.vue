<template>
    <div id="comment" class="w-full h-screen relative _bg_main pb-20  overflow-y-auto ">

   <van-nav-bar
       :border="false"
       title="展示评论区"
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



       
           <section v-for="comm in commentData" :key="comm?.id" class="py-3">
               <section @click="goDetails(comm)" class="px-4 w-full ">
                <div class="border-b border-b-[#333333] pb-2 ">
                    <div class="py-1 text-[#333333] text-sm px-1">
                      <div class="py-1 flex items-center space-x-2">
                        <div class="w-8 h-8 rounded-full bg-[#FF5C24]"></div>
                        <span class=" font-bold text-base">{{ comm?.username }}</span>
                      </div>
                       <div class="py-1 w-full ">
                           <p class="text-sm">{{ comm?.title }}</p>
                       </div>
                       <div class="py-2 w-full">
                        <img :src="comm?.img" alt="image" class="h-20 w-20 object-cover">
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
          <section class="py-3 px-4 text-[#333333]">
             <div class="flex flex-col justify-center   ">
                    <span class=" pt-2 pb-2 pl-3 ">上传图片
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
            </section>
           <div class="px-4">
            <div class="text-[#333]  text-sm tracking-wider text-left pl-3 ">您的主题</div>
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
           </div>
            <section class="px-4 py-8">
                <van-button   @click="onSubmit"   block   :loading="submitLoading"  :disabled="submitLoading"
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

        <!-- back to top -->
       <van-back-top  bottom="30vh" style="background:#E24939" />
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
const submitLoading = ref(false)
const finished = ref(false);
const refreshing = ref(false);
const commentData = ref([])
const comment = ref('')
const frontImage = ref([]);
const frontImageUrl = ref("");

const goBack = () => {
 router.push("/user");
};

const formatDate = (date) => {
  return dayjs(date).format('MM/DD HH:mm')
}

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
  if(frontImageUrl.value == '') return showToast('請先上傳圖片')
  if(comment.value == '') return showToast('请输入您的主题')
  let data = { content:comment.value,img:frontImageUrl.value};
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
  }); 
  submitLoading.value = true;
  try {
   
    const res = await homeApi.uploadCommentTitle(data);

    submitLoading.value = false;
    console.log('getComment ', res)
    showToast({ message: res?.data?.msg, duration: 2000 });
    if (res?.data?.success && res?.data?.code == 200) {
      comment.value = ''
      frontImageUrl.value = ''
      frontImage.value = []
      onRefresh()
    }
  } catch (error) {
    submitLoading.value = false;
    console.log(error);
  }
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