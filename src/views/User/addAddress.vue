<template>
  <div class="w-full h-full relative _bg_main">
    <div
      class="h-12  text-[#000]  w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">{{isEdit ? '修改' : '添加'}} 收货地址</div>
      <div class="flex-none"></div>
    </div>
    <section class=" h-[calc(100vh_-_48px)] flex flex-col loginForm mt-0">
      <div class="formSection px-5">
        <van-form>

          <div class="text-[#333] font-bold text-sm tracking-wider text-left pl-1 mt-5 pb-2">收货地址</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color border-gray-300 border mt-1"
          >
            <div
              class="border-none w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="address"
                autocomplete="off"
                placeholder="请输入收货地址"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-400 placeholder:tracking-widest"
                maxlength="50"
                type="text"
              />
            </div>
          </div>

        </van-form>
        <div class="mt-8">
          <van-button
            @click="onSubmit" :loading="loading"  :disabled="loading" 
            block
            class="back_muli"
            style="
              background-color: #E24939;
              border: none;
              color: #fff;
              height: 50px;
            "
          >
            {{isEdit ? '修改' : '添加'}} 
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
const route = useRoute();
const store = useStore();

const uploadCarousel = ref('')

const name = ref('')
const phone = ref('')
const address = ref('')
const loading = ref(false)
const isEdit = ref(false)
const userInfo = computed(()=> store.getters["app/ProfileInfoData"])

onMounted(()=> {
//   name.value = userInfo.value?.name
//   phone.value = userInfo.value?.phone
//   address.value = userInfo.value?.address
  if (route?.query !== undefined) {
   name.value = route?.query?.name;
   phone.value = route?.query?.phone;
   address.value = route?.query?.address;
   isEdit.value = route?.query?.isEdit
 } 
})

const goBack = () => {
  router.push("/address");
};


const onSubmit = async () => {
  console.log("click button");
  if (
    // name.value == "" ||
    // phone.value == "" ||
    address.value == "" 
  )
    return showToast("请输入完整的信息");
  //   if (phone.value?.length < 11) return showToast("电话号码应为 11 个字符");

  // if (
  //   !/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
  //     phone.value
  //   )
  // ) {
  //   return showToast("手机号码格式不对");
  // }
  let data = {
    // name: name.value,
    // phone: phone.value,
    address: address.value,
  };
   loading.value = true
  try {
    showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    const res = await userApi.addAddress(data);
     loading.value = false
    showToast({ message: res?.data?.msg, duration: 2000 });
    if (res?.data?.success == true && res?.data?.code == 200) {
      //addAddressDialog.value = false;
      await globaljs.getUserInfo();
     setTimeout(() => {
         router.push("/address");
     }, 500);
    }
  } catch (error) {
     loading.value = false
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