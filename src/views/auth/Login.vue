<template>
  <div class="relative min-h-screen min-w-full w-full overflow-y-auto   h-screen  items-center max-w-md sm:mx-auto   login__   ">
    <img
      src="@/assets/auth/loginbg.jpg"
      alt=""
      class="w-full h-full object-fill absolute "
    />
    <video
      id="register_video"
      class="register__video__3tV1S bg-cover "
      
      autoplay loop muted
      preload="auto"
      playsInline
    >
      <source
        src="@/assets/loginVideo.mp4"
        type="video/mp4"
      />
    </video>
    <!-- fixed top-0 left-0 right-0 bottom-0 -->
   <section class="px-3 py-5 z-10 fixed top-0 left-0 right-0 bottom-0 ">
    <!-- <div class="flex items-center justify-center text-white tracking-wider space-x-3 text-base px-10  absolute top-20 w-full">
       <img src="@/assets/auth/logo.png" alt="logo" class="w-24">
    </div> -->
    <div class="flex flex-col   items-end py-2">
     <div @click="goChat" class="flex flex-col items-center justify-center">
      <img src="@/assets/auth/service.png" alt="service" class="w-10">
      <span class="text-white text-sm tracking-wider">联系客服</span>
     </div>
    </div>
    <div class="flex items-center justify-center py-2">
      <img src="@/assets/auth/logo.png" alt="service" class="w-24 ">
    </div>

   <section class="  z-20  w-full  rounded-xl px-8 pt-16 max-w-md mx-auto ">
    <!-- <div class="text-2xl font-bold tracking-wider text-white pb-3">登录帐户</div> -->
 
    <form @click.prevent class="   relative text-[#999999]  w-full ">
      <!-- <div class="text-white text-base tracking-wide py-2">用户名</div> -->
      <div class=" px-4 rounded-md h-12 w-full  formDiv bg-white bg-opacity-80 border border-[#999999]">
        <div
                class="border-none w-full h-full text-sm flex justify-center items-center relative"
              >
               <div class="flex items-center space-x-2">
                <img src="@/assets/auth/person.png" alt="person" class="w-4 h-4">
                <span> ：</span>
               </div>
                <input
                  v-model.trim="account" 
                  autocomplete="off"
                  placeholder="请输入用户名"
                  class="input-name  bg-transparent px-3 text-[#333] border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-[#999999] placeholder:font-medium placeholder:tracking-wide"
                   type="text"
                />
              </div>
      </div>
      <!-- <div class="text-white text-base tracking-wide pb-2 pt-3">密码</div> -->
       <div class="pt-5"></div>
      <div class=" px-4 rounded-md h-12 w-full  relative  bg-white bg-opacity-80 border border-[#999999] ">
        <div  class="border-none w-full h-full text-sm flex justify-center items-center relative "  >

        <div class="flex items-center space-x-2">
                <img src="@/assets/auth/lock.png" alt="person" class="w-4 h-4">
                <span> ：</span>
         </div>
              <input
              v-model.trim="password"
                  autocomplete="off"
                  placeholder="请输入密码"
                  class="input-name  bg-transparent px-3 text-[#333] border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-[#999999] placeholder:font-medium placeholder:tracking-wide"
                  min="6"
                  max="17"
                  maxlength="17"
                  :type="passwordField"
                />
                <div
                class="absolute right-0  flex items-center justify-center"
              >
                <van-icon
                  @click="showVisibile"
                  v-if="passwordField !== 'password'"
                  name="eye-o"
                  size="20"
                  color="#592b0c"
                />
                <van-icon
                  v-else
                  @click="showVisibile"
                  name="closed-eye"
                  size="20"
                  color="#592b0c"
                />
              </div>
              </div>
      </div>

       <div class="pt-5"></div>
      <div class=" px-4 rounded-md h-12 w-full  relative  bg-white bg-opacity-80 border border-[#999999] ">
      <div  class="border-none w-full h-full text-sm flex justify-center items-center  "  >
        <div class="flex items-center space-x-2">
                <img src="@/assets/auth/guard.png" alt="person" class="w-4 h-4">
                <span> ：</span>
         </div>
              <input
              v-model.trim="inputValidation"
                  autocomplete="off"
                  placeholder="输入验证吗"
                  class="input-name  bg-transparent px-3 text-[#333] border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-[#999999] placeholder:font-medium placeholder:tracking-wide"
                  min="6"
                  max="17"
                  maxlength="4"
                  type="text"
                />

              </div>
              <div
                class="absolute right-0 h-full top-0 w-20 bg-[#bbb] flex items-center justify-center "
              >
               <div @click="createFourRandom" class=" flex text-white text-lg tracking-wide font-bold items-center justify-center w-full h-full ">
                {{randomNumber}}
               </div>
              </div>
      </div>
      <div  class="flex justify-between items-center pt-12 text-[#fff] font-semibold tracking-wider text-sm cursor-pointer"  >
          <div class="flex items-center">
            <span>没有帐户？</span>
            <span @click="goSection(1)" class="text-[#000] text-base"
              >注册</span
            >
          </div>

          <div @click="goSection(2)" class="text-right py-2 tracking-wider">
            忘记密码
          </div>

        </div>
      
      <div class="pt-7">
              <van-button @click="onSubmit" :loading="loading" :disabled="loading" block color="#E24939" style="    font-weight: bold;  font-size: 18px;  height: 48px;
                ">登录</van-button>

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
import globaljs from "@/utils/global";

const router = useRouter();
const route = useRoute();
const store = useStore();
const account = ref(""); //mma123
const password = ref(""); //123AAA
const passwordField = ref("password");
const inputValidation = ref('')
const loading = ref(false);
const checked = ref(false);
const randomNumber = ref('')

const noticeData = computed(()=> store.getters["app/NoticeData"])

const showVisibile = () => {
  passwordField.value =
    passwordField.value === "password" ? "text" : "password";
};

const createFourRandom = () => {
  randomNumber.value = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('')
}

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

const goChat = () => {
  router.push({ name: 'Chat', query: { url: noticeData.value?.customer_url  } })

}

const onSubmit = () => {
  //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (account.value == "" || password.value == "") return showToast("请输入完整的登录信息");
  // if (account.value?.length < 11) return showToast("电话号码应为 11 个字符");
  if(inputValidation.value !== randomNumber.value) return showToast("提示: 验证码不正确!");
        
      
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
        store.commit("app/PASSWORD_INFO", md5(password.value))
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
  globaljs.getNotice()
  createFourRandom()
  if (route?.query !== undefined && route.query?.acc !== undefined) {
    account.value = route.query?.acc;
  }
});

</script>

<style scoped>
.bg_image{
  background-image: url(@/assets/auth/background.png);
  background-repeat: no-repeat;
  position: relative;
  background-size: 100% 100%;
}
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