<template>
  <div class="w-full  relative _bg_main">
    <div
      class="h-12  text-[#000]  w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">实名认证</div>
      <div class="flex-none"></div>
    </div>
    <section class="text-center loginForm mt-0  h-[calc(100vh_-_48px)] px-5  text-white">
      <div class="formSection py-5">
        <van-form>

          <div
            class="text-[#333] font-bold text-sm tracking-wider text-left pl-1 mt-5"
          >
           姓名             

          </div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color   mt-1"
          >
            <div v-if="realInfoData?.state == 0 || realInfoData?.state == 1"
              class=" w-full h-full text-sm flex px-3 text-black  items-center relative"
            >
              {{realInfoData?.real_name}}
            </div>
            <div v-else
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input 
                v-model="realname"
                autocomplete="off"
                placeholder="请输入真实姓名"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-600 placeholder:tracking-widest"
                maxlength="20"
                type="text"
              />
            </div>
          </div>

          <div
            class="text-[#333] font-bold text-sm tracking-wider text-left pl-1 mt-5"
          >
           身份证号
          </div>

          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color   mt-1"
          >
          <div v-if="realInfoData?.state == 0 || realInfoData?.state == 1"
              class=" w-full h-full text-sm flex px-3 text-black  items-center relative"
            >
              {{realInfoData?.id_code}}
            </div>
            <div v-else
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input 
                v-model="id_code"
                autocomplete="off"
                placeholder="请输入身份证号"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-600 placeholder:tracking-widest"
                maxlength="30"
                type="tel"
              />
            </div>
          </div>
          <div
            class="text-[#333] font-bold text-sm tracking-wider text-left pl-1 mt-5"
          >
          身份证照片
          </div>
          <div v-if="realInfoData?.state == 0 || realInfoData?.state == 1" class="flex items-center py-2 space-x-5 justify-between text-[#333] ">
            <div  class="flex flex-col  items-center  ">
              <!-- {{ BaseImageUrl + frontImage }} -->
              <van-image
              width="100"
              height="100" fit="cover" 
             
              :src="realInfoData?.id_front_url" @click="showImage(realInfoData?.id_front_url)"
            />
            <span class=" pt-2">身份证正面</span>
          </div>
            <div class="flex flex-col  items-center   ">
              <van-image
              width="100"
              height="100" fit="cover" 
              
              :src="realInfoData?.id_back_url" @click="showImage(realInfoData?.id_back_url)"
            />
            <!-- <img src="https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg" alt=""> -->
            <span class=" pt-2">身份证反面</span>

          </div>
            <div class="flex flex-col  items-center   ">
              <van-image 
              width="100"
              height="100" fit="cover" 
             
              :src="realInfoData?.id_hand_url" @click="showImage(realInfoData?.id_hand_url)"
            />
            <!-- <img src="https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg" alt=""> -->
            <span class=" pt-2">手持身份证</span>

          </div>
          </div>
          <div v-else class="flex text-[#333]  items-center py-2 space-x-5 justify-between">
            <div  class="flex flex-col  items-center  ">
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
            <span class=" pt-2">身份证正面</span>
          </div>
            <div class="flex flex-col  items-center   ">
            <van-uploader
              accept="image/*"
              v-model="backImage"
              :max-count="1"
              :max-size="5000 * 1024"
              @oversize="onOversize"
              :after-read="backafterRead"
            >
            <div class="bg-white h-20 flex items-center justify-center w-20 rounded ">
              <img src="@/assets/front.png" alt="front" class="w-10">
            </div>
            </van-uploader>
            <!-- <img src="https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg" alt=""> -->
            <span class=" pt-2">身份证反面</span>

          </div>
            <div class="flex flex-col  items-center   ">
            <van-uploader
              accept="image/*"
              v-model="personalImage"
              :max-count="1"
              :max-size="5000 * 1024"
              @oversize="onOversize"
              :after-read="personalafterRead"
            >
            <div class="bg-white h-20 flex items-center justify-center w-20 rounded ">
              <img src="@/assets/personal.png" alt="front" class="w-10">
            </div>
            </van-uploader>
            <!-- <img src="https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg" alt=""> -->
            <span class=" pt-2">手持身份证</span>

          </div>
          </div>


        </van-form>
        <div class="mt-8">
          <van-button
            @click="onSubmit"
            block
            :loading="loading"
            :disabled="realInfoData?.state == 0 ||  realInfoData?.state == 1"
            class="back_muli"
            style="
              background-color: #E24939;
              border: none;
              color: #fff;
              height: 50px;
            "
          >
            {{ realInfoData?.state == 0 ? '未审核' : realInfoData?.state == 1 ? '已通过' : realInfoData?.state == 2 ? '已拒绝' : '确认'  }}
          </van-button>
        </div>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import passpng from "@/assets/user/password.svg";
import phonepng from "@/assets/user/phone.svg";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import userApi from "@/network/user.js";
import md5 from "js-md5";
import globaljs from "@/utils/global";

const router = useRouter();
const store = useStore();

const uploadCarousel = ref("");
const btnText = ref("确认");
// const disabledBtn = ref(false)

const frontImage = ref([]);
const realInfoData = ref(null)
const backImage = ref([]);
const personalImage = ref([]);
const frontImageUrl = ref("");
const backImageUrl = ref("");
const personalImageUrl = ref("");
const realname = ref("");
const id_code = ref("");//330302199808180355
const loading = ref(false);
const userInfo = computed(() => store.getters["app/ProfileInfoData"]);
const BaseImageUrl = computed(() => store.getters["app/BaseImageUrl"]);
onMounted(() => {
  getRealInfo()
  globaljs.getUserInfo();
  // if (userInfo?.value?.isRealName == 1) {
  //   btnText.value = " 已实名认证";
  //   disabledBtn.value = true
    // realname.value = realInfoData?.value?.real_name;
    // id_code.value = realInfoData?.value?.id_code;
  //   frontImage.value[0] = userInfo?.value?.id_front_url;
  //   backImage.value[0] = userInfo?.value?.id_back_url;
  //   personalImage.value[0] = userInfo?.value?.id_hand_url;
  // }
});


const showImage = (image) => {
  // image = `${image}`
  if (image == null) return showToast("没有可用的图像");
  showImagePreview({
    closeable: true, 
    images: [image],
    className:'showImageClass',
    onClose() {
    },
  });
};


const goBack = () => {
  router.push("/user");
};

const onOversize = (file) => {
  console.log(file);
  showToast("文件大小不能超过 5MB");
};

async function personalafterRead(file, detail) {
  console.log(file.file, "personalafterRead");
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
      personalImageUrl.value = res?.data?.data?.url;
    }
    console.log(res, "resssssssss");
  } catch (err) {
    personalImage.value = [];
    showToast("图片上传错误");
    console.log(err, "imageupload error");
  }
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

async function backafterRead(file, detail) {
  console.log(file, "backafterRead");
  //backImageUrl.value = await globaljs.getBase64(file.file); // Convert image file to Base64
  //backImageUrl.value = file.file;

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
      backImageUrl.value = res?.data?.data?.url;
    }
    console.log(res, "resssssssss");
  } catch (err) {
    backImage.value = [];
    showToast("图片上传错误");
    console.log(err, "imageupload error");
  }
}

const onSubmit = async () => {
  //console.log(frontImageUrl.value);
  console.log("click button");
  if (
    realname.value == "" ||
    id_code.value == ""
    // frontImageUrl.value == "" ||
    // backImageUrl.value == ""
  )
    return showToast("请输入完整的信息");

  const ispass = globaljs.identityIDCard(id_code.value);
  // console.log(ispass.isPass,ispass.errorMessage);

  if (!ispass.isPass) {
    return showToast(ispass.errorMessage);
  }

  loading.value = true;
  let data = {
    true_name: realname.value,
    id_code: id_code.value,
     id_front_url: frontImageUrl.value,
     id_back_url: backImageUrl.value,
     id_hand_url: personalImageUrl.value,
  };
  try {
    showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    const res = await userApi.RealName(data);
    loading.value = false;
    showToast({ message: res?.data?.msg, duration: 2000 });
    if (res?.data?.success == true && res?.data?.code == 200) {
      //addAddressDialog.value = false;
      //await globaljs.getUserInfo();
      router.push("/user");
    }
  } catch (error) {
    loading.value = false;
    closeToast();
    console.log(error);
  }
};
const getRealInfo = async () => {
  loading.value = true;
  try {
    showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    const res = await userApi.GetRealNameInfo();
    loading.value = false;
    //showToast({ message: res?.data?.msg, duration: 2000 });
    if (res?.data?.success == true && res?.data?.code == 200) {
      realInfoData.value = res?.data?.data
    }
  } catch (error) {
    loading.value = false;
    closeToast();
    console.log(error);
  }
};
</script>


<style scoped>
._bg_main{
  background-image: url(@/assets/auth/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
</style>