<template>
  <div class="w-full h-full  bg-[#B3000A] relative">
    <div
      class="h-12 bg-[#B3000A] text-white  w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">更改密码</div>
      <div class="flex-none"></div>
    </div>
    <section class="px-5 text-center loginForm bg-[#B3000A] h-[calc(100vh_-_48px)] ">
      <div class="formSection pt-5">
        <form @click.prevent>
          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">当前密码</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color border-gray-300 border mt-1"
          >
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="oldpassword"
                autocomplete="off"
                placeholder="请输入当前密码"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-600 placeholder:tracking-widest"
                min="6"
                max="17"
                maxlength="17"
                :type="oldpasswordField"
              />
            </div>
            <div
              class="absolute right-4 text-black flex items-center justify-center"
            >
              <van-icon
                @click="oldshowVisibile"
                v-if="oldpasswordField !== 'password'"
                name="eye-o"
                size="20"
                 color="#FF4855"
              />
              <van-icon
                v-else
                @click="oldshowVisibile"
                name="closed-eye"
                size="20"
                 color="#FF4855"
              />
            </div>
          </div>
          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">新密码</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color border-gray-300 border mt-1"
          >
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="newpassword"
                autocomplete="off"
                placeholder="请输入新密码"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-600 placeholder:tracking-widest"
                min="6"
                max="17"
                maxlength="17"
                :type="passwordField"
              />
            </div>
            <div
              class="absolute right-4 text-black flex items-center justify-center"
            >
              <van-icon
                @click="showVisibile"
                v-if="passwordField !== 'password'"
                name="eye-o"
                size="20"
                 color="#FF4855"
              />
              <van-icon
                v-else
                @click="showVisibile"
                name="closed-eye"
                size="20"
                 color="#FF4855"
              />
            </div>
          </div>
          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">确认密码</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color border-gray-300 border  mt-1"
          >
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="confirmpass"
                autocomplete="off"
                placeholder="请输入确认密码"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-600 placeholder:tracking-widest"
                min="6"
                max="17"
                maxlength="17"
                :type="conpasswordField"
              />
            </div>
            <div
              class="absolute right-4 text-black flex items-center justify-center"
            >
              <van-icon
                @click="conshowVisibile"
                v-if="conpasswordField !== 'password'"
                name="eye-o"
                size="20"
                 color="#FF4855"
              />
              <van-icon
                v-else
                @click="conshowVisibile"
                name="closed-eye"
                size="20"
                 color="#FF4855"
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
              更改密码
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

const oldpassword = ref("");
const newpassword = ref("");
const confirmpass = ref("");
const loading = ref(false)

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
 // router.push("/accsetting");
  router.push("/user");
};

const onSubmit = async () => {
  if (
    oldpassword.value == "" ||
    newpassword.value == "" ||
    confirmpass.value == ""
  )
    return showToast("请输入完整的信息");
  if (newpassword.value.length < 6) return showToast("密码必须至少有6个字符长");
  if (newpassword.value !== confirmpass.value)
    return showToast("两次输入密码不一致");

  if (!/(?=.*\d)(?=.*[A-Z])/.test(newpassword.value)) {
    return showToast("密码应至少包含一个大写字母和数字");
  }

  let data = {
    old_pw: md5(oldpassword.value),
    new_pw: md5(newpassword.value),
    new_pw2: md5(confirmpass.value),
  };
  loading.value = true
  try {
    showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    const res = await userApi.changePassword(data );
    loading.value = false
    showToast({message:res?.data?.msg,duration:2000});
    if (res?.data?.success == true && res?.data?.code == 200) {
      //store.commit("app/PROFILE_USER_INFO", res.data?.data);
      //userData.value = res?.data?.data;
      router.push('/user')
    }
  } catch (error) {
     closeToast();
     loading.value = false
    console.log(error);
  }
};
</script>


<style scoped>
</style>