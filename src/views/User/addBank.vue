<template>
  <div class="w-full h-full relative">
    <div
      class="h-12 bg-[#B3000A] text-white w-full flex justify-between items-center px-3 text-base font-bold "
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">{{ userInfo?.isBindBank == 0 ? '綁定个人银行卡信息' : '修改个人银行信息' }}</div>
      <div class="flex-none"></div>
    </div>
    <section class="   loginForm mt-0 bg-[#B3000A] h-[calc(100vh_-_48px)] flex flex-col">
      <!-- <section class="bg-[#fafafa] w-full relative flex items-center py-3 justify-center">
        <img src="@/assets/loginbg.jpg" alt="loginbg" class="h-20 w-20">
      </section> -->
      <div class="formSection px-5">
        <van-form>
         <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">银行账户名称</div>
          <div
            class="w-full flex items-center relative rounded-lg white_color h-14    mt-1"
          >
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="card_account"
                autocomplete="off"
                placeholder="请输入银行账户名称"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-400 placeholder:tracking-widest"
                maxlength="50"
                type="text"
              />
            </div>
          </div>

          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5"> 银行卡号</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color  mt-1"
          >
          
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="card_code"
                autocomplete="off"
                placeholder="请输入银行卡号"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-400 placeholder:tracking-widest"
                maxlength="50"
                type="text"
              />
            </div>
          </div>

          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">电话号码</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color  mt-1"
          >
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="phone"
                autocomplete="off"
                placeholder="请输入电话号码"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-400 placeholder:tracking-widest"
                maxlength="11"
                type="tel"
              />
            </div>
          </div>
          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">银行卡图片</div>
         
          <div class="flex flex-col  py-2  w-full  ">
            <van-uploader
              accept="image/*" class="w-full"
              v-model="frontImage"
              :max-count="1"
              :max-size="5000 * 1024"
              @oversize="onOversize"
              :after-read="frontafterRead"
            />
          </div>
          
        </van-form>
        <div class="mt-8">
          <van-button
            @click="onSubmit" :loading="loading"  :disabled="loading" 
            block
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
import passpng from "@/assets/user/password.svg";
import phonepng from "@/assets/user/phone.svg";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { showToast, showLoadingToast, closeToast } from "vant";
import userApi from "@/network/user.js";
import md5 from "js-md5";
import globaljs from "@/utils/global";

const router = useRouter();
const store = useStore();

const uploadCarousel = ref('')

const frontImage = ref([]);
const backImage = ref([]);
const frontImageUrl = ref("");
const backImageUrl = ref("");
const id_code = ref("");
const bank_address = ref("");
const bank = ref("")
const phone = ref("")
const card_code = ref("")
const card_account = ref("")
const loading = ref(false)

const userInfo = computed(()=> store.getters["app/ProfileInfoData"])

onMounted(()=>{
  bank_address.value = userInfo.value?.bank_address
  bank.value = userInfo.value?.bank
  card_code.value = userInfo.value?.card_code
  card_account.value = userInfo.value?.bank_account
})

const goBack = () => {
  router.push("/bankcard");
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

const onSubmit = async () => {
  console.log("click button");
  if ( card_code.value == "" ||phone.value == "" ||  card_account.value == ""  )  return showToast("请输入完整的信息");

  let data = {
    //id_code: userInfo.value?.id_code,
    card_code: card_code.value,
    phone: phone.value,
    card_account: card_account.value,
    img: frontImageUrl.value,
    //bank_address: bank_address.value,
    
  };
   loading.value = true
  try {
    showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    const res = await userApi.bindBank(data);
     loading.value = false
    showToast({ message: res?.data?.msg, duration: 2000 });
    if (res?.data?.success == true && res?.data?.code == 200) {
      //addAddressDialog.value = false;
      //await globaljs.getUserInfo();
      router.push("/bankcard");
    }
  } catch (error) {
     loading.value = false
    closeToast();
    console.log(error);
  }
};
</script>


<style scoped>
</style>