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
     <div class="px-3  w-full h-full flex items-center justify-center relative">
         <div>
            <div  class="flex flex-col items-center justify-center py-3  w-full  ">
            <img :src="BaseImageUrl + noticeList?.qrcode" alt="" class="w-full h-56 object-cover">
            <span class="py-2 text-white font-bold text-xl tracking-wider">扫描二维码付款</span>
          </div>
         </div>
         
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
const route = useRoute()
const store = useStore();
const frontImage = ref([]);
const frontImageUrl = ref("");
const loading = ref(false)
const noticeList = ref(null);
const task_content_data = ref(null)
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
    if(route.query.task_content){
        task_content_data.value = JSON.parse(route.query.task_content)

  }
    getNotice()
});

const onSubmit = () => {

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