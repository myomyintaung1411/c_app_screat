<template>
    <div id="mission" class="w-full h-screen relative bg-[#B3000A] overflow-y-auto ">
     <van-nav-bar
    :border="false"
    title="任务玩明"
    left-arrow
    @click-left="goBack"
    color="#fff" 
   style="background: #B3000A;font-weight:500 !important;color:#ffffff !important;"
  />
  <section class="">
     <div class="px-3 py-2 w-full relative">
         <div>
            <span class="  text-white">付款截圖</span>
            <div  class="flex flex-col py-3   ">
            <van-uploader
              accept="image/*"
              v-model="frontImage"
              :max-count="1"
              :max-size="5000 * 1024"
              @oversize="onOversize"
              :after-read="frontafterRead"
            >
            <div class="bg-white h-20 flex items-center justify-center w-20 rounded ">
              <img src="@/assets/front.png" alt="front" class="w-10">
            </div>
            </van-uploader>
          </div>
         </div>
         <div class="mt-8">
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
           确认
          </van-button>
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
const store = useStore();
const frontImage = ref([]);
const frontImageUrl = ref("");
const loading = ref(false)

const goBack = () => {
router.push("/home");
};

onMounted(() => {
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
#mission :deep() .van-nav-bar__title {
color:#fff !important
}
#mission :deep() .van-nav-bar .van-icon {
color:#fff !important

}
</style>