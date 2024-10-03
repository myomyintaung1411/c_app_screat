<template>
    <div id="payqrPage" class="w-full h-screen relative bg-[#B3000A] overflow-y-auto ">
     <van-nav-bar
    :border="false"
    title="支付二维码"
    left-arrow
    @click-left="goBack"
    color="#fff" 
   style="background: #B3000A;font-weight:500 !important;color:#ffffff !important;"
  />
  <section class="h-[90vh] ">
     <div class="px-3  w-full h-full flex flex-col items-center justify-center relative">
         <div>
            <div  class="flex flex-col items-center justify-center py-3  w-full  ">
              <span class="text-white font-bold py-3 text-xl">{{ select_item == 1 ? task_content_data?.item1 :  select_item == 2 ? task_content_data?.item2 : task_content_data?.item3 }}</span>
            <img :src="BaseImageUrl + noticeList?.qrcode" alt="" class="w-full h-56 object-cover">
            <span class="py-2 text-white font-bold text-xl tracking-wider">扫描二维码付款</span>
          </div>
         </div>

         <div class="mt-8 w-full px-5">
          <van-button
            @click="openDialog"
            block
            class="back_muli"
            style="
              background-color: #FF4855;
              border: none;
              color: #fff;
              height: 50px;
            "
          >
           上传凭证
          </van-button>
        </div>
         
     </div>
  </section>
  </div>
  <van-popup v-model:show="upload_dialog" @click-overlay="closeEvent" @close="closeEvent" @click-close-icon="closeEvent" closeable  round  position="bottom" :style="{ height: '80%' }" class=" bg-none bg-transparent">
    <div class="py-4 px-3 relative flex  flex-col items-center justify-center">
      <div class="text-center text-xl w-full  inline-block  font-bold">已完成的任务凭证</div>
      
      <div  class="flex flex-col py-3  px-4 pt-4 mt-5 items-center justify-center   ">
        <div class="py-3 text-base tracking-wide">任务凭证</div>
            <van-uploader
              accept="image/*"
              v-model="frontImage"
              :max-count="1"
              :max-size="5000 * 1024"
              @oversize="onOversize"
              :after-read="frontafterRead"
            >
            
            </van-uploader>
         </div>
         <div class="mt-8 w-full px-5">
          <van-button
            @click="onSubmit"
            block
            :loading="loading"
            :disabled="loading"
            class="back_muli"
            style="
              background-color: #FF4855;
              border: none;
              color: #fff;
              height: 50px;
            "
          >
          提交已完成的任务凭证
          </van-button>
        </div>
    </div>
  </van-popup>
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
const route = useRoute()
const store = useStore();
const frontImage = ref([]);
const frontImageUrl = ref("");
const loading = ref(false)
const noticeList = ref(null);
const task_content_data = ref(null)
const select_item = ref(null)
const upload_dialog = ref(false)
const BaseImageUrl = computed(() => store.getters["app/BaseImageUrl"]);

const goBack = () => {
router.push("/home");
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


onMounted(() => {
    if(route.query.task_content && route.query.select_item){
       select_item.value = route.query.select_item
        task_content_data.value = JSON.parse(route.query.task_content)
  }
    getNotice()
});

const closeEvent = () => {
  upload_dialog.value = false
}

const openDialog = () => {
  upload_dialog.value = true
}

const onSubmit = async () => {
  if(frontImageUrl.value == '') return showToast('請上傳任务凭证')
    // console.log(tesk,"gg")
    let itemId = select_item.value == 1 ? task_content_data.value?.item1 :  select_item.value == 2 ? task_content_data.value.item2 : task_content_data.value?.item3
  // console.log(itemId,"jafa")
  loading.value = true
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
  });
  let data = { task_id: task_content_data.value?.task_id, item_id: itemId ,image:frontImageUrl.value};
  try {
    const res = await homeApi.getuploadTaskCertificate(data);
    showToast({ message: res?.data?.msg, duration: 2000 });
    console.log('getuploadTaskCertificate ', res)
    loading.value = false
    if (res?.data?.success && res?.data?.code == 200) {
      upload_dialog.value = false
      
     // carousalImage.value = res?.data?.data;
    }
  } catch (error) {
    loading.value = false
    console.log(error);
  }
}

const onOversize = (file) => {
  console.log(file);
  showToast("文件大小不能超过 5MB");
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

</script>


<style scoped >
#payqrPage :deep() .van-nav-bar__title {
color:#fff !important
}
#payqrPage :deep() .van-nav-bar .van-icon {
color:#fff !important

}
</style>