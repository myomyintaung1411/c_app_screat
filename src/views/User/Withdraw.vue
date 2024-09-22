<template>
  <div class="w-full h-full relative bg-[#B3000A]">
    <div
      class="h-12 bg-[#B3000A] text-white w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">提现</div>
      <div class="flex-none"></div>
    </div>
    <section class="px-5 py-3 bg-[#B3000A] h-[calc(100vh_-_48px)] text-center  ">
      <div class="formSection">
        <form @click.prevent>
          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">提现</div>
          <div
            class="w-full border h-14 px-3 flex items-center relative rounded-lg  white_color mt-1"
          >
          <van-radio-group v-model="withdraw_type" direction="horizontal">
            <van-radio :name="1" checked-color="#FF4855">余额提现</van-radio>
            <van-radio :name="2" checked-color="#FF4855">推荐金提现</van-radio>
          </van-radio-group>

          </div>

          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">提现金额</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 bg-white   mt-1"
          >
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="amount"
                autocomplete="off"
                placeholder="请输入提现金额"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-400 placeholder:tracking-widest"
                min="6"
                max="17"
                maxlength="17"
                type="tel"
              />
            </div>
          </div>

          <div class="mt-8">
            <van-button
              @click="onSubmit"
              block
              :loading="loading"  :disabled="loading"
              class="back_muli"
              style="
                background-color: #FF4855;
                border: none;
                color: #fff;
                height: 50px;
              "
            >
              确认提现
            </van-button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref } from "vue";
import passpng from "@/assets/user/password.svg";
import phonepng from "@/assets/user/phone.svg";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast } from "vant";
import userApi from "@/network/user.js";
import md5 from "js-md5";

const router = useRouter();

const amount = ref("");
const newpassword = ref("");
const confirmpass = ref("");
const loading = ref(false)
const withdraw_type = ref(1)
const oldpasswordField = ref("password");
const passwordField = ref("password");
const conpasswordField = ref("password");

const oldshowVisibile = () => {
  oldpasswordField.value =
    oldpasswordField.value === "password" ? "text" : "password";
};
const showVisibile = () => {
  passwordField.value =
    passwordField.value === "password" ? "text" : "password";
};
const conshowVisibile = () => {
  conpasswordField.value =
    conpasswordField.value === "password" ? "text" : "password";
};

const goBack = () => {
  router.push("/home");
};

const onSubmit = async () => {
  if (
    amount.value == "" 
  )
    return showToast("请输入提现金额");

  loading.value = true
  let data = {
    withdraw_amount:amount.value,
    type:withdraw_type.value
  };
  try {
    showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    const res = await userApi.WithdrawAmount(data);
    loading.value = false
    if (res?.data?.success == true && res?.data?.code == 200) {
      showToast({ message: '申请成功', duration: 1500 });
      //addAddressDialog.value = false;
      //await globaljs.getUserInfo();
      setTimeout(() => {
        router.push("/user");
      }, 1000);
    } else {
      showToast({ message: '暂未开放', duration: 1500 });
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