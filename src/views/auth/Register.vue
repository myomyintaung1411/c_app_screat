<template>
  <div class="w-full text-center h-screen logo_bg">
    <div class="pt-14">
    <div
      class="px-3 py-5 text-center flex justify-center flex-col mt-10 items-center"
    >
      <img src="@/assets/logo.png" alt="" class="w-20  rounded-full" />
      <span class="pt-2 text-base">鄉</span>
    </div>
    <section class="px-5 py-3 text-center loginForm">
      <div class="formSection">
        <form @click.prevent>
          <!-- <div
            class="w-full flex items-center relative rounded-lg h-14 white_color"
          >
            <div
              class="border-none w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="username"
                autocomplete="off"
                placeholder="请输入用户名"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-600 placeholder:tracking-widest"
                maxlength="20"
                type="text"
              />
            </div>
          </div> -->
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color mt-4"
          >
            <div
              class="border-none w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="phone"
                autocomplete="off"
                placeholder="请输入电话号码"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-600 placeholder:tracking-widest"
                min="11"
                max="11"
                maxlength="11"
                type="tel"
              />
            </div>
          </div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color mt-5"
          >
            <div
              class="border-none w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="password"
                autocomplete="off"
                placeholder="请输入密码"
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
                 color="#4286f5"
              />
              <van-icon
                v-else
                @click="showVisibile"
                name="closed-eye"
                size="20"
                 color="#4286f5"
              />
            </div>
          </div>

          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color mt-5"
          >
            <div
              class="border-none w-full h-full text-sm flex justify-center items-center relative"
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
                 color="#4286f5"
              />
              <van-icon
                v-else
                @click="conshowVisibile"
                name="closed-eye"
                size="20"
                 color="#4286f5"
              />
            </div>
          </div>

          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color mt-5"
          >
            <div
              class="border-none w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="invite_code"
                autocomplete="off"
                placeholder="请输入邀请码"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-600 placeholder:tracking-widest"
                maxlength="15"
                type="text"
              />
            </div>
          </div>

          <div class="mt-5">
            <van-button
              @click="onSubmit"
              block
              :loading="loading"
               :disabled="loading"
              class="back_muli"
              style="
               background:#279EFF;
                border: none;
                color: #fff;
                height: 56px;
              "
            >
              注册
            </van-button>
          </div>
        </form>
      </div>
      <div class="text-right py-2 text-gray-200 text-sm cursor-pointer">
        <div class="flex items-center justify-end">
          <span>已有账户？</span>
          <span @click="goSection(1)" class="text-white text-base">登录</span>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>


<script setup>
import { ref, computed,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast } from "vant";
import authApi from "@/network/auth.js";
import md5 from "js-md5";

const router = useRouter();
const route = useRoute();
const invite_code = ref("");//  0QGM
const username = ref("");
const phone = ref("");
const password = ref("");
const confirmpass = ref("");
const passwordField = ref("password");
const conpasswordField = ref("password");
const loading = ref(false)

const showVisibile = () => {
  passwordField.value =
    passwordField.value === "password" ? "text" : "password";
};
const conshowVisibile = () => {
  conpasswordField.value =
    conpasswordField.value === "password" ? "text" : "password";
};

const goSection = (number) => {
  switch (number) {
    case 1:
      router.push("/login");
      break;
    default:
      break;
  }
};

const onSubmit = () => {
  if (
    // username.value == "" ||
    phone.value == "" ||
    password.value == "" ||
    confirmpass.value == "" ||
    invite_code.value == ""
  )
    return showToast("请输入完整的信息");
  if (password.value.length < 6) return showToast("密码必须至少有6个字符长");
  if (password.value !== confirmpass.value)
    return showToast("两次输入密码不一致");
  if (!/(?=.*\d)(?=.*[A-Z])/.test(password.value)) {
    return showToast("密码应至少包含一个大写字母和数字");
  }
  // if (username.value == password.value)
  //   return showToast("用户名和密码不能相同");

  if (phone.value?.length < 11) return showToast("电话号码应为 11 个字符");
  if (
    !/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
      phone.value
    )
  ) {
    return showToast("手机号码格式不对");
  }

  let data = {
   // username: username.value,
    username:phone.value,
    phone: phone.value,
    password: md5(password.value),
    repassword:md5(confirmpass.value),
    invitation_code: invite_code.value,
  };

  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: 'spinner',

  });
  loading.value = true
  authApi
    .Register(data)
    .then((res) => {
      loading.value = false
      showToast({message:res?.data?.msg,duration:2000});
      //closeToast();
      //console.log(res.data);

      if (res?.data?.success == true && res?.data?.code == 200) {
        router.push({path:'/login',query:{acc:phone.value}});
      }
      console.log(res.data.msg, "register res");
    })
    .catch((err) => {
      loading.value = false
      closeToast();
      console.log(err, "error");
    });

  // router.push("/login");
};

onMounted(()=>{
  if (route?.query !== undefined && route.query?.shareCode !== undefined) {
   invite_code.value = route?.query?.shareCode;
 } 
})
</script>
