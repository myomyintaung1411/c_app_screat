<template>
    <div class="relative min-h-screen min-w-full w-full h-screen max-w-md sm:mx-auto flex flex-col items-center justify-center  login__  ">
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
   <section class="z-10 fixed bg-black bg-opacity-50 left-0 right-0 top-0 bottom-0 w-full h-full flex flex-col justify-center ">
    <!-- <div class="flex items-center justify-center absolute top-10 w-full">
      <img src="@/assets/logo.png" alt="logo" class="w-20">
    </div> -->
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
   <section class=" flex items-center flex-col justify-center z-20   py-5 rounded-xl mx-5  ">
     <div class="text-2xl font-bold tracking-wider text-white">账户注册</div>
    <form @click.prevent class="px-6 py-4 relative ">
      <div class="text-white text-base tracking-wide py-2">用户名</div>
      <div class=" px-4 rounded-md h-12 w-full bg-white bg-opacity-40 ">
       
        <div
                class="border-none w-full h-full text-sm flex justify-center items-center relative"
              >
              <van-icon name="contact-o" class="text-white" size="20" />
                <input
                  v-model.trim="username" 
                  autocomplete="off"
                  placeholder="请输入用户名"
                  class="input-name text-[#fff] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-white placeholder:font-bold placeholder:tracking-wide"
                   type="email"
                />
              </div>
      </div>
      <div class="text-white text-base tracking-wide pb-2 pt-3">密码</div>

      <div class=" px-4 rounded-md h-12 w-full bg-white bg-opacity-40  relative ">
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
                  color="#ffffff"
                />
                <van-icon
                  v-else
                  @click="showVisibile"
                  name="closed-eye"
                  size="20"
                  color="#ffffff"
                />
              </div>
              </div>
      </div>
      <!-- <div class=" px-4 rounded-md h-12 w-full border-[2px] border-white mt-5 relative ">
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
                  v-model.trim="confirmpass"
                  autocomplete="off"
                  placeholder="请输入确认密码"
                  class="input-name text-[#fff] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-white placeholder:font-bold placeholder:tracking-wide"
                  min="6"
                  max="17"
                  maxlength="17"
                  :type="conpasswordField"
                />
                <div
                class="absolute right-0 text-white flex items-center justify-center"
              >
                <van-icon
                  @click="conshowVisibile"
                  v-if="conpasswordField !== 'password'"
                  name="eye-o"
                  size="20"
                  color="#fff"
                />
                <van-icon
                  v-else
                  @click="conshowVisibile"
                  name="closed-eye"
                  size="20"
                  color="#fff"
                />
              </div>
              </div>
      </div> -->
      <div class="text-white text-base tracking-wide pb-2 pt-3">电话号码</div>

      <div class=" px-4 rounded-md h-12 w-full  bg-white bg-opacity-40 ">
        <div
                class="border-none w-full h-full text-sm flex justify-center items-center relative"
              >
              <van-icon name="phone-o" class="text-white" size="20" />
                <input
                  v-model.trim="phone" maxlength="11" minlength="11"
                  autocomplete="off"
                  placeholder="请输入电话号码"
                  class="input-name text-[#fff] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-white placeholder:font-bold placeholder:tracking-wide"
                   type="tel"
                />
              </div>
      </div>
      <div class="text-white text-base tracking-wide pb-2 pt-3">邀请码</div>
      <div class=" px-4 rounded-md h-12 w-full bg-white bg-opacity-40">
        <div
                class="border-none w-full h-full text-sm flex justify-center items-center relative"
              >
              <van-icon name="passed" class="text-white" size="20" />
                <input
                  v-model.trim="invite_code" maxlength="11" 
                  autocomplete="off"
                  placeholder="请输入邀请码"
                  class="input-name text-[#fff] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-white placeholder:font-bold placeholder:tracking-wide"
                   type="tel"
                />
              </div>
      </div>

      
      <div class="pt-6">
              <van-button @click="onSubmit" :loading="loading" :disabled="loading" block color="#d63436"  style="   font-weight: bold;  font-size: 18px;  height: 48px;
                ">注册</van-button>

      </div>

        <div  class="flex justify-between items-center pt-4 text-white font-bold tracking-wider text-sm cursor-pointer"  >
          <div class="flex items-center">
            <span>已有账户？</span>
            <span @click="goSection(1)" class="text-[#FF4855] text-base"
              >登录</span
            >
          </div>
          <!-- <div @click="goSection(2)" class="text-right py-2 tracking-wider">
            忘记密码
          </div> -->
        </div>

     </form>
   </section>
  </section> 
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
const invite_code = ref("0QGM");//  0QGM
const username = ref("mma123");
const phone = ref("13222222222");
const password = ref("123AAA");
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
     username.value == "" ||
    phone.value == "" ||
    password.value == "" ||
    // confirmpass.value == "" ||
    invite_code.value == ""
  )
    return showToast("请输入完整的信息");
  if (password.value.length < 6) return showToast("密码必须至少有6个字符长");
  // if (password.value !== confirmpass.value)
  //   return showToast("两次输入密码不一致");
  if (!/(?=.*\d)(?=.*[A-Z])/.test(password.value)) {
    return showToast("密码应至少包含一个大写字母和数字");
  }
   if (username.value == password.value)
     return showToast("用户名和密码不能相同");

  if (phone.value?.length < 11) return showToast("电话号码应为 11 个字符");
  if (
    !/^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
      phone.value
    )
  ) {
    return showToast("手机号码格式不对");
  }

  let data = {
    username: username.value,
   // username:phone.value,
    phone: phone.value,
    password: md5(password.value),
    repassword:md5(password.value),//confirmpass
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
        router.push({path:'/login',query:{acc:username.value}});
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
</style>