<template>
  <div class="w-full text-center  h-screen login_bg ">
   <section class="h-[50vh] flex items-center flex-col justify-center ">
    <div>
      <img src="@/assets/logo.png" alt="logo" class="w-20">
    </div>
    <div class="text-2xl font-bold tracking-wide pt-2">
      Welcome Back
    </div>
    <div class="text-md ">
      Sign in to continue
    </div>
   </section>
   <section class="h-[50vh] flex items-center flex-col justify-center bg-white border-r rounded-t-3xl  ">
     <form @click.prevent class="px-10 py-4 relative w-full">
      <div class=" px-4 rounded-md h-12 w-full border-[2px] border-gray-300 ">
        <div
                class="border-none w-full h-full text-sm flex justify-center items-center relative"
              >
              <van-icon name="contact-o" class="text-gray-400" size="20" />
                <input
                  v-model="account" 
                  autocomplete="off"
                  placeholder="hello@gmail.com"
                  class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-400 placeholder:font-bold placeholder:tracking-wide"
                   type="email"
                />
              </div>
      </div>
      <div class=" px-4 rounded-md h-12 w-full border-[2px] border-gray-300 mt-7 relative ">
        <div  class="border-none w-full h-full text-sm flex justify-center items-center relative text-gray-400"  >
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
                  v-model="password"
                  autocomplete="off"
                  placeholder="Password"
                  class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-400 placeholder:font-bold placeholder:tracking-wide"
                  min="6"
                  max="17"
                  maxlength="17"
                  :type="passwordField"
                />
                <div
                class="absolute right-0 text-black flex items-center justify-center"
              >
                <van-icon
                  @click="showVisibile"
                  v-if="passwordField !== 'password'"
                  name="eye-o"
                  size="20"
                  color="#9ca3af"
                />
                <van-icon
                  v-else
                  @click="showVisibile"
                  name="closed-eye"
                  size="20"
                  color="#9ca3af"
                />
              </div>
              </div>
      </div>
      <div class="pt-7 flex items-center justify-between">
        <van-checkbox v-model="checked" shape="square" icon-size="18" checked-color="#050a30">Remember me</van-checkbox>

      </div>
      
      <div class="pt-5">
              <van-button @click="onSubmit" :loading="loading" :disabled="loading" block color="#050a30" style="    font-weight: bold;  font-size: 18px;  height: 48px;
                ">LOGIN</van-button>

            </div>
     </form>
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
const account = ref("hello@gmail.com");
const password = ref("123aaa");
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (account.value == "" || password.value == "") return showToast("请输入完整的登录信息");
  if (!emailRegex.test(account.value))  return  showToast("请输入有效的电子邮件地址");
    
        
      
  let data = {
    username: account.value,
    password: md5(password.value),
  };
   router.push("/home");
  // showLoadingToast({
  //   message: "加载中...",
  //   forbidClick: true,
  //   loadingType: "spinner",
  // });
  // loading.value = true;
  // authApi
  //   .Login(data)
  //   .then((res) => {
  //     loading.value = false;
  //     console.log(res.data);
  //     showToast({ message: res?.data?.msg, duration: 2000 });
  //     //closeToast();
  //     showToast(res?.data?.msg);
  //     if (res?.data?.success == true && res?.data?.code == 200) {
  //       store.commit("app/LOGIN_DATA", res.data?.data);
  //       router.push("/");
  //     }
  //   })
  //   .catch((err) => {
  //     loading.value = false;
  //     closeToast();
  //     console.log(err, "error");
  //   });
};

onMounted(() => {
  if (route?.query !== undefined && route.query?.acc !== undefined) {
    account.value = route.query?.acc;
  }
});

</script>
