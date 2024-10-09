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
 
    <form @click.prevent class="   relative text-[#999999]  ">
      <!-- <div class="text-white text-base tracking-wide py-2">用户名</div> -->
      <div class=" px-4 rounded-md h-12 w-full  formDiv bg-white border border-[#999999]">
        <div
                class="border-none w-full h-full text-sm flex justify-center items-center relative"
              >
               <div class="flex items-center space-x-2">
                <img src="@/assets/auth/guard.png" alt="person" class="w-4 h-4">
                <span> ：</span>
               </div>
                <input
                  v-model.trim="id_code" 
                  autocomplete="off"
                  placeholder="请输入身份证号"
                  class="input-name  bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-[#999999] placeholder:font-medium placeholder:tracking-wide"
                   type="text"
                />
              </div>
      </div>
      <div class="pt-5"></div>
      <div class=" px-4 rounded-md h-12 w-full  formDiv bg-white border border-[#999999]">
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
                  placeholder="请输入电话号码"
                  class="input-name  bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-[#999999] placeholder:font-medium placeholder:tracking-wide"
                   type="text"
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
        <div  class="border-none w-full h-full text-sm flex justify-center items-center relative "  >

        <div class="flex items-center space-x-2">
                <img src="@/assets/auth/lock.png" alt="person" class="w-4 h-4">
                <span> ：</span>
         </div>
              <input
              v-model.trim="confirmpass"
                  autocomplete="off"
                  placeholder="请输入确认密码"
                  class="input-name  bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-[#999999] placeholder:font-medium placeholder:tracking-wide"
                  min="6"
                  max="17"
                  maxlength="17"
                  :type="conpasswordField"
                />
                <div
                class="absolute right-0  flex items-center justify-center"
              >
                <van-icon
                  @click="conshowVisibile"
                  v-if="conpasswordField !== 'password'"
                  name="eye-o"
                  size="20"
                  color="#592b0c"
                />
                <van-icon
                  v-else
                  @click="conshowVisibile"
                  name="closed-eye"
                  size="20"
                  color="#592b0c"
                />
              </div>
              </div>
      </div>
      <div  class="flex justify-between items-center pt-4 text-[#433C2B] font-semibold tracking-wider text-sm cursor-pointer"  >
        <div  class="flex justify-between items-center pt-4  font-bold tracking-wider text-sm cursor-pointer"  >
        <div  @click="goLoign" class="flex items-center">
          <span>返回帐号登录</span>
        </div>
        <!-- <div @click="goSection(2)" class="text-right py-2 tracking-wider">
          忘记密码
        </div> -->
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
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast } from "vant";
import authApi from "@/network/auth.js";
import md5 from "js-md5";
import globaljs from "@/utils/global";

const router = useRouter();

const id_code = ref("");
const account = ref("");
const password = ref("");
const confirmpass = ref("");
const passwordField = ref("password");
const conpasswordField = ref("password");
const loading = ref(false);

const showVisibile = () => {
  passwordField.value =
    passwordField.value === "password" ? "text" : "password";
};
const conshowVisibile = () => {
  conpasswordField.value =
    conpasswordField.value === "password" ? "text" : "password";
};

const goLoign = () => {
  router.push("/login");
};

const onSubmit = () => {
  if (
    id_code.value == "" ||
    account.value == "" ||
    password.value == "" ||
    confirmpass.value == ""
  )
    return showToast("请输入完整的信息");
  if (password.value.length < 6) return showToast("密码必须至少有6个字符长");
  if (password.value !== confirmpass.value)
    return showToast("两次输入密码不一致");
  if (!/(?=.*\d)(?=.*[A-Z])/.test(password.value)) {
    return showToast("密码应至少包含一个大写字母和数字");
  }

  const ispass = globaljs.identityIDCard(id_code.value);
  // console.log(ispass.isPass,ispass.errorMessage);

  if (!ispass.isPass) {
    return showToast(ispass.errorMessage);
  }

  let data = {
    id_code: id_code.value,
    username: account.value,
    password: md5(password.value),
    repassword: md5(confirmpass.value),
  };

  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
  });
  loading.value = true;

  authApi
    .ForgetPass(data)
    .then((res) => {
      loading.value = false;
      showToast({ message: res?.data?.msg, duration: 2000 });
      //closeToast();
      console.log(res.data);

      return;

    })
    .catch((err) => {
      loading.value = false;
      closeToast();
      console.log(err, "error");
    });

  // router.push("/login");
};
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