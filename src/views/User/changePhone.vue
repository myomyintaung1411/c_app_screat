
<template>
  <div class="w-full h-full relative _bg_main">
    <div
      class="h-12 text-black  w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">更换手机号</div>
      <div class="flex-none"></div>
    </div>
    <section class="px-5 text-center loginForm  h-[calc(100vh_-_48px)]">
      <div class="formSection pt-5">
        <form @click.prevent>
          <div class="text-[#333] font-bold text-sm tracking-wider text-left pl-1 mt-5">登录密码</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color border-gray-300 border mt-1"
          >
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="loginpassword"
                autocomplete="off"
                placeholder="请输入登录密码"
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
                 color="#E24939"
              />
              <van-icon
                v-else
                @click="showVisibile"
                name="closed-eye"
                size="20"
                 color="#E24939"
              />
            </div>
          </div>
          <div class="text-[#333] font-bold text-sm tracking-wider text-left pl-1 mt-5">旧电话号码</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color border-gray-300 border mt-1"
          >
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="oldphone"
                autocomplete="off"
                placeholder="请输入旧电话号码"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-600 placeholder:tracking-widest"
                min="11"
                max="11"
                maxlength="11"
                type="tel"
              />
            </div>
          </div>
          <div class="text-[#333] font-bold text-sm tracking-wider text-left pl-1 mt-5">新电话号码</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color border-gray-300 border  mt-1"
          >
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="newphone"
                autocomplete="off"
                placeholder="请输入新电话号码"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-600 placeholder:tracking-widest"
                min="11"
                max="11"
                maxlength="11" type="tel"
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
                background-color: #E24939;
                border: none;
                color: #fff;
                height: 50px;
              "
            >
            更换手机号
            </van-button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref,computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { showToast, showLoadingToast, closeToast } from "vant";
import userApi from "@/network/user.js";
import md5 from "js-md5";
import globaljs from "@/utils/global";

const router = useRouter();
const store = useStore();

const loginpassword = ref('')
const oldphone = ref('')
const newphone = ref('')
const passwordField = ref('password')
const loading = ref(false)

const userInfo = computed(() => store.getters["app/ProfileInfoData"]);

onMounted(() => {
  oldphone.value = userInfo?.value?.phone
})

const showVisibile = () => {
    passwordField.value = passwordField.value === "password" ? "text" : "password";
};

const goBack = () => {
    router.push('/profileinfo')
}

const onSubmit = async () => {
  if (
    loginpassword.value == "" ||
    oldphone.value == "" ||
    newphone.value == ""
  )
  return showToast("请输入完整的信息");

    if (newphone.value?.length < 11) return showToast("电话号码应为 11 个字符");
    if (
    !/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
      newphone.value
    )
  ) {
    return showToast("手机号码格式不对");
  }
    

  let data = {
    pw: md5(loginpassword.value),
    old_phone:oldphone.value,
    new_phone: newphone.value,
  };
   loading.value = true
  try {
    showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    const res = await userApi.changePhone(data );
    console.log(res)
     loading.value = false
    showToast({message:res?.data?.msg,duration:2000});
    if (res?.data?.success == true && res?.data?.code == 200) {
      await globaljs.getUserInfo();
      setTimeout(() => {
         router.push("/profileinfo");
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