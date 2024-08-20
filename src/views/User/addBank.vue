<template>
  <div class="w-full h-full relative">
    <div
      class="h-20  w-full flex justify-between items-center px-3 text-base font-bold "
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">{{ userInfo?.bank == null || !userInfo.bank || userInfo.bank_card == null || !userInfo.bank_card ? '綁定个人银行卡信息' : '修改个人银行信息' }}</div>
      <div class="flex-none"></div>
    </div>
    <section class="   loginForm mt-0 bg-white h-[calc(100vh_-_80px)] flex flex-col">
      <!-- <section class="bg-[#fafafa] w-full relative flex items-center py-3 justify-center">
        <img src="@/assets/loginbg.jpg" alt="loginbg" class="h-20 w-20">
      </section> -->
      <div class="formSection px-5">
        <van-form>
         <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">姓名</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 border-gray-300 border   mt-1"
          >
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="card_name"
                autocomplete="off"
                placeholder="请输入姓名"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-400 placeholder:tracking-widest"
                maxlength="50"
                type="text"
              />
            </div>
          </div>

          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5"> 银行账户名称</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color border-gray-300 border mt-1"
          >
          
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="bank"
                autocomplete="off"
                placeholder="请输入银行账户名称"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-400 placeholder:tracking-widest"
                maxlength="50"
                type="text"
              />
            </div>
          </div>

          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">银行卡号</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 white_color border-gray-300 border mt-1"
          >
            <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="bank_card"
                autocomplete="off"
                placeholder="请输入银行卡号"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-400 placeholder:tracking-widest"
                maxlength="50"
                type="text"
              />
            </div>
          </div>
        </van-form>
        <div class="mt-8">
          <van-button
            @click="onSubmit" :loading="loading"  :disabled="loading" 
            block
            class="back_muli"
            style="
              background-color: #050a30;
              border: none;
              color: #fff;
              height: 50px;
            "
          >
            确认
          </van-button>
        </div>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref,computed,onMounted } from "vue";
import passpng from "@/assets/user/password.svg";
import phonepng from "@/assets/user/phone.svg";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { showToast, showLoadingToast, closeToast } from "vant";
import userApi from "@/network/user.js";
import md5 from "js-md5";
import globaljs from "@/utils/global";

const router = useRouter();
const store = useStore();

const uploadCarousel = ref('')

const frontImage = ref([]);
const backImage = ref([]);
const frontImageUrl = ref("");
const backImageUrl = ref("");
const id_code = ref("");
const bank_address = ref("");
const bank = ref("")
const bank_card = ref("")
const card_name = ref("")
const loading = ref(false)

const userInfo = computed(()=> store.getters["app/ProfileInfoData"])

onMounted(()=>{
  bank_address.value = userInfo.value?.bank_address
  bank.value = userInfo.value?.bank
  bank_card.value = userInfo.value?.bank_card
  card_name.value = userInfo.value?.bank_account
})

const goBack = () => {
  router.push("/bankcard");
};


const onSubmit = async () => {
  console.log(frontImageUrl.value);
  console.log("click button");
  if (
    bank.value == "" ||
    card_name.value == "" ||
    bank_card.value == "" 
  )
    return showToast("请输入完整的信息");

  let data = {
    //id_code: userInfo.value?.id_code,
    bank_card: bank_card.value,
    bank: bank.value,
    card_name: card_name.value,
    bank_address: bank_address.value,
    
  };
   loading.value = true
  try {
    showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    const res = await userApi.bindBank(data);
     loading.value = false
    showToast({ message: res?.data?.msg, duration: 2000 });
    if (res?.data?.success == true && res?.data?.code == 200) {
      //addAddressDialog.value = false;
      //await globaljs.getUserInfo();
      router.push("/bankcard");
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