<template>
  <div id="newmessage" class="w-full h-full relative">
    <div
      class="h-20  w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">收货地址</div>
      <div class="flex-none"></div>
    </div>

    <section
      v-if=" addressData == null || addressData == ''"
    >
      <div class="py-20 text-center">
        <van-empty
          description="还没有收货地址"
          color="#fff"
          style="color: white"
        />
        <div class="pt-3 px-5">
          <van-button
            @click="onSubmit"
            block
            class="back_muli font-bold"
            style="
              background-color: #063970;
              border: none;
              color: #fff;
              height: 56px;
            "
          >
            添加
          </van-button>
        </div>
      </div>
    </section>

    <section v-else  class="bg-white h-[calc(100vh_-_80px)] px-4">
      <div  class="py-2 px-1 w-full ">
        <div class="font-bold text-sm  text_color py-3">
           姓名
          </div>
        <div class="flex justify-between items-center px-3 bg-white border border-gray-300 rounded-lg  py-4 text-sm">

          <div class=" tracking-widest">
              {{addressData?.name}}sdfds
          </div>
        </div>
      </div>

      <div class="py-2 px-1 w-full">
        <div class="font-bold text-sm text_color py-3">
            手机号
          </div>
        <div class="flex justify-between items-center px-3 bg-white border border-gray-300 rounded-lg  py-4 text-sm text-black">
 
          <div class=" tracking-widest">
             {{addressData?.phone}}sdfdsf
          </div>
        </div>
      </div>
        <div class="py-2 px-1 w-full text-black">
          <div class="font-bold text-sm text_color whitespace-nowrap py-3">
            收货地址
          </div>
        <div class="flex justify-between w-full  items-center px-3 bg-white border border-gray-300 rounded-lg  py-4 text-sm">

          <div class=" tracking-widest van-ellipsis max-w-[80%]">
             {{addressData?.address}}sdfds
          </div>
        </div>
      </div>
     

      <div class="pt-8 px-1">
           <van-button
            @click="onEditAddress"
            block
            class="back_muli font-bold"
            style="
              background-color: #050a30;
              border: none;
              color: #fff;
              height: 50px;
            "
          >
            修改 收货地址
          </van-button>
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
const addAddressDialog = ref(false);
const addressData = ref(null);
const loading = ref(false)

const isEdit = ref(false)

const goBack = () => {
  router.push("/user");
};

const onSubmit = () => {
   router.push("/addAddress");
};
const onEditAddress = () => {
   router.push({path:'/addAddress',query:{name:addressData.value?.name,
   address:addressData.value?.address,
   phone:addressData.value?.phone,isEdit:true}});
};
const GetUserAddress = async () => {
  try {
    // showLoadingToast({
    //   message: "加载中...",
    //   forbidClick: true,
    //   loadingType: "spinner",
    //   duration:1000
    // });
    const res = await userApi.getAddress();
    console.log(res)
    //showToast({ message: res?.data?.msg, duration: 2000 });
    if (res?.data?.success == true && res?.data?.code == 200) {
     addressData.value = res?.data?.data
     // await globaljs.getUserInfo();
    }
  } catch (error) {
    closeToast();
    console.log(error);
  }
};
onMounted(()=> {
   // globaljs.getUserInfo();
   GetUserAddress()
})
</script>
  


<style scoped>
#newmessage :deep() .van-empty__description {
  color: white !important;
}
</style>