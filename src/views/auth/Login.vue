<template>
  <div class="relative min-h-screen min-w-full w-screen h-screen flex flex-col items-center max-w-md sm:mx-auto justify-center  login__   ">
    <!-- <img
      src="https://www.0wtz2q.com/_next/static/chunks/images/img_background_login-c4a7660140d5a8f9e98fdbae5b7b85f5.png"
      alt=""
      class="w-full h-full object-cover"
    /> -->
    <video
      id="register_video"
      class="register__video__3tV1S bg-cover "
      autoplay="autoplay"
      muted
      preload="preload"
      loop="loop"
    >
      <source
        src="@/assets/loginVideo.mp4"
        type="video/mp4"
      />
    </video>
   <section class=" bg-black bg-opacity-50 z-10 fixed left-0 right-0 top-0 bottom-0 w-full h-full flex flex-col justify-center ">
    <div class="flex items-center justify-center text-white tracking-wider space-x-3 text-base px-10  absolute top-20 w-full">
      <!-- <van-icon name="flower-o" size="20" /> -->
       <img src="@/assets/1.png" alt="logo" class="w-24">
      <!-- <span>项目名称</span> -->
    </div>
    <!-- <section class="h-[50vh] flex items-center flex-col justify-center  z-50  ">
    <div>
      <img src="@/assets/logo.png" alt="logo" class="w-20">
    </div>
    <div class="text-2xl font-bold tracking-wide pt-2">
      Welcome Back
    </div>
    <div class="text-md">
      Sign in to continue
    </div>
   </section> -->
   <section class=" flex items-center flex-col justify-center z-20  py-5 rounded-xl mx-5  ">
    <!-- <div class="text-2xl font-bold tracking-wider text-white pb-3">登录帐户</div> -->
 
    <form @click.prevent class="px-10 py-4 relative   ">
      <div class="text-white text-base tracking-wide py-2">用户名</div>
      <div class=" px-4 rounded-md h-12 w-full  formDiv bg-white bg-opacity-40">
        <div
                class="border-none w-full h-full text-sm flex justify-center items-center relative"
              >
              <van-icon name="contact-o" class="text-white" size="20" />
                <input
                  v-model.trim="account" 
                  autocomplete="off"
                  placeholder="请输入用户名"
                  class="input-name text-[#fff] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-white placeholder:font-bold placeholder:tracking-wide"
                   type="email"
                />
              </div>
      </div>
      <div class="text-white text-base tracking-wide pb-2 pt-3">密码</div>
      <div class=" px-4 rounded-md h-12 w-full  relative  bg-white bg-opacity-40">
        <div  class="border-none w-full h-full text-sm flex justify-center items-center relative text-white"  >
          <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18 10.5C19.6569 10.5 21 11.8431 21 13.5V19.5C21 21.1569 19.6569 22.5 18 22.5H6C4.34315 22.5 3 21.1569 3 19.5V13.5C3 11.8431 4.34315 10.5 6 10.5V7.5C6 4.18629 8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5V10.5ZM12 3.5C14.2091 3.5 16 5.29086 16 7.5V10.5H8V7.5C8 5.29086 9.79086 3.5 12 3.5ZM18 12.5H6C5.44772 12.5 5 12.9477 5 13.5V19.5C5 20.0523 5.44772 20.5 6 20.5H18C18.5523 20.5 19 20.0523 19 19.5V13.5C19 12.9477 18.5523 12.5 18 12.5Z"
            fill="currentColor"
          />
        </svg>
              <input
              v-model.trim="password"
                  autocomplete="off"
                  placeholder="请输入密码"
                  class="input-name text-[#fff] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-white placeholder:font-bold placeholder:tracking-wide"
                  min="6"
                  max="17"
                  maxlength="17"
                  :type="passwordField"
                />
                <div
                class="absolute right-0 text-white flex items-center justify-center"
              >
                <van-icon
                  @click="showVisibile"
                  v-if="passwordField !== 'password'"
                  name="eye-o"
                  size="20"
                  color="#fff"
                />
                <van-icon
                  v-else
                  @click="showVisibile"
                  name="closed-eye"
                  size="20"
                  color="#fff"
                />
              </div>
              </div>
      </div>

      
      <div class="pt-7">
              <van-button @click="onSubmit" :loading="loading" :disabled="loading" block color="#fd3130" style="    font-weight: bold;  font-size: 18px;  height: 48px;
                ">登录</van-button>

      </div>

        <div  class="flex justify-between items-center pt-4 text-white font-bold tracking-wider text-sm cursor-pointer"  >
          <div class="flex items-center">
            <span>没有帐户？</span>
            <span @click="goSection(1)" class="text-[#fd3130] text-base"
              >注册</span
            >
          </div>

          <div @click="goSection(2)" class="text-right py-2 tracking-wider">
            忘记密码
          </div>

        </div>

     </form>
   </section>
  </section> 
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast } from "vant";
import authApi from "@/network/auth.js";
import { useStore } from "vuex";
import md5 from "js-md5";

const router = useRouter();
const route = useRoute();
const store = useStore();
const account = ref("mma123");
const password = ref("123AAA");
const passwordField = ref("password");
const loading = ref(false);
const checked = ref(false);

const showVisibile = () => {
  passwordField.value =
    passwordField.value === "password" ? "text" : "password";
};

const goSection = (number) => {
  switch (number) {
    case 1:
      router.push("/register");
      break;
    case 2:
      router.push("/forgetpass");
      break;

    default:
      break;
  }
};

const onSubmit = () => {
  //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (account.value == "" || password.value == "") return showToast("请输入完整的登录信息");
  //if (!emailRegex.test(account.value))  return  showToast("请输入有效的电子邮件地址");
    
        
      
  let data = {
    username: account.value,
    password: md5(password.value),
  };
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
  });
  loading.value = true;
  authApi
    .Login(data)
    .then((res) => {
      loading.value = false;
      console.log(res.data);
      showToast({ message: res?.data?.msg, duration: 2000 });
      //closeToast();
      showToast(res?.data?.msg);
      if (res?.data?.success == true && res?.data?.code == '200') {
        store.commit("app/LOGIN_DATA", res.data?.data);
        router.push("/");
      }
    })
    .catch((err) => {
      loading.value = false;
      closeToast();
      console.log(err, "error");
    });
};

onMounted(() => {
  if (route?.query !== undefined && route.query?.acc !== undefined) {
    account.value = route.query?.acc;
  }
});

</script>

<style scoped>
.register_video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;

}

video {
  height: 100vh;
  width: 100%;
  object-fit:cover;
  aspect-ratio: 16 / 9;
  position: absolute;
}
/* .formDiv:focus-within {
    border:2px solid white;
    outline: 0;
} */


</style>