<template>
  <div id="newmessage" class="w-full h-full relative">
    <div
      class="h-20  w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">我的卡包</div>
      <div class="flex-none"></div>
    </div>
    <!-- v-if="userInfo?.bank != null || userInfo?.bank || userInfo?.bank_card != null || userInfo?.bank_card" -->
    <section v-if="userInfo?.bank != null || userInfo?.bank || userInfo?.bank_card != null || userInfo?.bank_card" class=" px-4 text-black bg-white h-[calc(100vh_-_80px)]">
     
        <div class="py-2 px-1 w-full">
          <div class="font-bold text-sm text_color py-3">
            姓名
          </div>
        <div class="flex justify-between items-center px-3  rounded-lg bg-white border border-gray-300 py-4 text-sm">

          <div class=" tracking-widest">
             {{ userInfo?.bank_account }}gdfs
          </div>
        </div>
      </div>
     
      <div class="py-2 px-1 w-full">
        <div class="font-bold text-sm text_color py-3">
           银行账户名称
          </div>
        <div class="flex justify-between items-center px-3  rounded-lg bg-white border border-gray-300 py-4 text-sm">

          <div class=" tracking-widest">
             {{ userInfo?.bank }}gdfs
          </div>
        </div>
      </div>

      <div class="py-2 px-1 w-full">
        <div class="font-bold text-sm text_color py-3">
            银行卡号
          </div>
        <div class="flex justify-between items-center px-3 bg- rounded-lg bg-white border border-gray-300 py-4 text-sm">

          <div class=" tracking-widest">
             {{ userInfo?.bank_card }}gdfs
          </div>
        </div>
      </div>
      <div class="pt-8 px-1">
          <van-button
            @click="onSubmit"
            block
            class="back_muli font-bold"
            style="
              background-color: #050a30;
              border: none;
              color: #fff;
              height: 50px;
            "
          >
            {{ userInfo?.bank == null || !userInfo?.bank || userInfo?.bank_card == null || !userInfo?.bank_card ? '綁定银行卡' : '修改银行卡'}}
          </van-button>
        </div>
      <!-- <div
        class="shadow-lg rounded-md py-3 px-3 bg-white flex items-center justify-between text-black"
      >
       
       <div>
         <div class="flex flex-col space-y-1">
          <div class="text-base font-bold">银行名</div>
          <div class="van-ellipsis max-w-[280px]">
            {{ userInfo?.bank }}
          </div>
        </div>
        <div class="flex flex-col space-y-1">
          <div class="text-base font-bold">银行账户名称</div>
          <div class="van-ellipsis max-w-[280px]">
            {{ userInfo?.bank_account }}
          </div>
        </div>
        <div class="flex flex-col space-y-1">
          <div class="text-base font-bold">银行卡号</div>
          <div class="van-ellipsis max-w-[280px]">
            {{ userInfo?.bank_card }}
          </div>
        </div>
       </div>

        <div>
          <van-button
            @click="onSubmit"
            icon="edit"
            size="small"
            type="primary"
            color="#4286f5"
          />
        </div>
      </div> -->
    </section>
    <section v-else>
      <div class="py-20 text-center">
        <van-empty description="还没卡包" color="#fff" style="color: white" />
        <div class="pt-3 px-5">
          <van-button
            @click="onSubmit"
            block
            class="back_muli font-bold"
            style="
              background-color: #063970;
              border: none;
              color: #fff;
              height: 56px;">
            添加
          </van-button>
        </div>
      </div>
    </section>
  </div>
</template>

  <script setup>
import { ref, computed, onMounted } from "vue";
import { showToast, showLoadingToast, closeToast } from "vant";
import userApi from "@/network/user.js";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import globaljs from "@/utils/global";

const router = useRouter();
const store = useStore();
const userInfo = computed(() => store.getters["app/ProfileInfoData"]);

const goBack = () => {
  router.push("/user");
};

const onSubmit = () => {
  router.push("/addBankCard");
};

// let formData = new FormData();
// formData.append("id_front_url", frontImageUrl.value); // 因为要上传多个文件，所以需要遍历一下才行
// formData.append("id_back_url", frontImageUrl.value); // 因为要上传多个文件，所以需要遍历一下才行

// const add_Address = async () => {
//   if (address.value == "") {
//     return showToast("请输入收货地址");
//   }
//   let data = {
//     address: address.value,
//   };
//   try {
//     showLoadingToast({
//       message: "加载中...",
//       forbidClick: true,
//       loadingType: "spinner",
//     });
//     const res = await userApi.editAddress(data);
//     showToast({ message: res?.data?.msg, duration: 2000 });
//     if (res?.data?.success == true && res?.data?.code == 200) {
//       addAddressDialog.value = false;
//       await globaljs.getUserInfo();
//       //router.push('/user')
//     }
//   } catch (error) {
//     closeToast();
//     console.log(error);
//   }
// };

onMounted(() => {
  globaljs.getUserInfo();
});
</script>
  


<style scoped>
#newmessage :deep() .van-empty__description {
  color: white !important;
}
</style>