<template>
    <div class="w-full h-screen relative _bg_main overflow-y-auto">
      <div
        class="h-12  text-black w-full flex justify-between items-center px-3 text-base font-bold"
      >
        <div @click="goBack" class="">
          <van-icon name="arrow-left" />
        </div>
        <div class="">充值</div>
        <div class="flex-none"></div>
      </div>

      <div v-if="info_data"  style="overflow-x: hidden !important;overflow-y: auto;" class="__iframe">
        <iframe  :src="info_data?.url"  scrolling="no" seamless="seamless"  frameborder="0" 
        style="overflow-x:hidden;overflow-y: auto;height:100%;width:100%" height="100%" width="100%"></iframe>
    </div>
    <!-- <div class="absolute bottom-10 px-5 w-full">
      <van-button
            @click="openDialog"
            block
            class="back_muli"
            style="
              background-color: #E24939;
              border: none;
              color: #fff;
              height: 50px;
            "
          >
          上传凭证
          </van-button>
    </div> -->
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
              :max-size="10000 * 1024"
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
              background-color: #E24939;
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
const info_data = ref(null)
const task_content = ref(null)
const frontImage = ref([]);
const frontImageUrl = ref("");
const upload_dialog = ref(false)
const loading = ref(false)
const closeEvent = () => {
  upload_dialog.value = false
}


  const goBack = () => {
    //router.push({ name: 'Recharge',query:{task_content:JSON.stringify(task_content.value)} })
   router.push('/home')
  };
  
  const onOversize = (file) => {
  console.log(file);
  showToast("文件大小不能超过 10MB");
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

  const onSubmit = async () => {
  if(frontImageUrl.value == '') return showToast('請上傳任务凭证')
    // console.log(tesk,"gg")
    // let itemId = select_item.value == 1 ? task_content.value?.item1 :  select_item.value == 2 ? task_content_data.value.item2 : task_content_data.value?.item3
  // console.log(itemId,"jafa")
  loading.value = true
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
  });
  let data = { task_id: task_content.value?.task_id, item_id: task_content.value?.item_id ,image:frontImageUrl.value};
  try {
    const res = await homeApi.getuploadTaskCertificate(data);
    showToast({ message: res?.data?.msg, duration: 2000 });
    console.log('getuploadTaskCertificate ', res)
    loading.value = false
    if (res?.data?.success && res?.data?.code == 200) {
      upload_dialog.value = false
      setTimeout(() => {
        router.push('/home')
      }, 500);
     // carousalImage.value = res?.data?.data;
    }
  } catch (error) {
    loading.value = false
    console.log(error);
  }
}
  
  const openDialog = () => {
    upload_dialog.value = true
  }

  onMounted(() => {
    console.log(route.query?.task_content,"route.query?.task_content")
    showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration:2000
  });
      if(route.query?.info && route.query?.task_content){
        info_data.value = JSON.parse(route.query?.info)
        task_content.value = JSON.parse(route.query?.task_content)
    }
  });
  

  

  </script>
  
  
  <style scoped >
          .__iframe {
          height: calc(100% - 48px);
          width: 100%;
          position: relative;
          background: inherit;
          overflow-y: auto;
        }

  #payqrPage :deep() .van-nav-bar__title {
  color:#fff !important
  }
  #payqrPage :deep() .van-nav-bar .van-icon {
  color:#fff !important
  
  }
  ._bg_main{
  background-image: url(@/assets/auth/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
  </style>