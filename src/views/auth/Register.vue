<template>
  <div class="relative min-h-screen min-w-full w-full   h-screen  items-center max-w-md sm:mx-auto   login__   ">
    <img
      src="@/assets/auth/background.png"
      alt=""
      class="w-full h-full object-fill"
    />
    <!-- <video
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
    </video> -->
   <section class="px-3 py-5 z-10 fixed top-0 left-0 right-0 bottom-0">
    <!-- <div class="flex items-center justify-center text-white tracking-wider space-x-3 text-base px-10  absolute top-20 w-full">
       <img src="@/assets/auth/logo.png" alt="logo" class="w-24">
    </div> -->
    <div class="flex justify-end py-2">
      <img src="@/assets/auth/service.png" alt="service" class="w-10">
    </div>
    <div class="flex items-center justify-center py-2">
      <img src="@/assets/auth/logo.png" alt="service" class="w-24 ">
    </div>

   <section class="  z-20  w-full  rounded-xl px-8 pt-6 max-w-md mx-auto">
    <!-- <div class="text-2xl font-bold tracking-wider text-white pb-3">登录帐户</div> -->
 
    <form @click.prevent class="   relative text-[#999999]  w-full ">
      <!-- <div class="text-white text-base tracking-wide py-2">用户名</div> -->
      <div class=" px-4 rounded-md h-12 w-full  formDiv bg-white border border-[#999999]">
        <div
                class="border-none w-full h-full text-sm flex justify-center items-center relative"
              >
               <div class="flex items-center space-x-2">
                <img src="@/assets/auth/person.png" alt="person" class="w-4 h-4">
                <span> ：</span>
               </div>
                <input
                  v-model.trim="username" 
                  autocomplete="off"
                  placeholder="请输入用户名"
                  class="input-name  bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-[#999999] placeholder:font-medium placeholder:tracking-wide"
                   type="email"
                />
              </div>
      </div>
      <!-- <div class="text-white text-base tracking-wide pb-2 pt-3">密码</div> -->
       <div class="pt-5"></div>
      <div class=" px-4 rounded-md h-12 w-full  relative  bg-white border border-[#999999] ">
        <div  class="border-none w-full h-full text-sm flex justify-center items-center relative "  >

        <div class="flex items-center space-x-2">
                <img src="@/assets/auth/lock.png" alt="person" class="w-4 h-4">
                <span> ：</span>
         </div>
              <input
              v-model.trim="password"
                  autocomplete="off"
                  placeholder="请输入密码"
                  class="input-name  bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-[#999999] placeholder:font-medium placeholder:tracking-wide"
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
      <div class=" px-4 rounded-md h-12 w-full  relative  bg-white border border-[#999999] ">
      <div  class="border-none w-full h-full text-sm flex justify-center items-center  "  >
        <div class="flex items-center space-x-1">
          <van-icon name="phone-o" class="text-[#000000]" size="16" />
                <span> ：</span>
         </div>
              <input
              v-model.trim="phone"
                  autocomplete="off"
                  placeholder="请输入电话号码"
                  class="input-name  bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-[#999999] placeholder:font-medium placeholder:tracking-wide"
                  maxlength="11" minlength="11"
                  type="tel"
                />

              </div>
      </div>
       <div class="pt-5"></div>
      <div class=" px-4 rounded-md h-12 w-full  relative  bg-white border border-[#999999] ">
      <div  class="border-none w-full h-full text-sm flex justify-center items-center  "  >
        <div class="flex items-center space-x-1">
          <van-icon name="passed" class="text-[#000000]" size="16" />
                <span> ：</span>
         </div>
              <input
              v-model.trim="invite_code"
                  autocomplete="off"
                  placeholder="请输入邀请码"
                  class="input-name  bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-[#999999] placeholder:font-medium placeholder:tracking-wide"
                  maxlength="11" minlength="11"
                  type="text"
                />

              </div>
      </div>

      <div  class="flex justify-between items-center pt-4 text-black font-bold tracking-wider text-sm cursor-pointer"  >
          <div class="flex items-center">
            <span>已有账户？</span>
            <span @click="goSection(1)" class="text-[#FF4855] text-base"
              >登录</span
            >
          </div>
        </div>
      <div class="pt-6">
              <van-button @click="onSubmit" :loading="loading" :disabled="loading" block color="#FF4855"  style="   font-weight: bold;  font-size: 18px;  height: 48px;
                ">注册</van-button>

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