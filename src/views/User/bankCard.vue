<template>
  <div id="newmessage" class="w-full h-full relative _bg_main">
    <div
      class="h-12  text-[#000]  w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">我的卡包</div>
      <div class="flex-none"></div>
    </div>
    <!-- v-if="userInfo?.bank != null || userInfo?.bank || userInfo?.bank_card != null || userInfo?.bank_card" -->
    <section v-if="bankInfo" class=" px-4 text-black  h-[calc(100vh_-_48px)] overflow-y-auto ">
     
        <div class="py-1 px-1 w-full">
          <div class="font-bold text-sm text-black py-2">
            银行账户名称
          </div>
        <div class="flex justify-between items-center px-3  rounded-lg bg-white border border-gray-300 py-3 text-sm">

          <div class=" tracking-widest">
             {{ bankInfo?.card_account }}
          </div>
        </div>
      </div>
     
      <div class="py-1 px-1 w-full">
        <div class="font-bold text-sm text-black py-2">
          银行卡号
          </div>
        <div class="flex justify-between items-center px-3  rounded-lg bg-white border border-gray-300 py-3 text-sm">

          <div class=" tracking-widest">
             {{ bankInfo?.card_code }}
          </div>
        </div>
      </div>

      <div class="py-1 px-1 w-full">
        <div class="font-bold text-sm text-black py-2">
          电话号码
          </div>
        <div class="flex justify-between items-center px-3 bg- rounded-lg bg-white border border-gray-300 py-3 text-sm">

          <div class=" tracking-widest">
             {{ bankInfo?.phone }}
          </div>
        </div>
      </div>
      <div class="py-1 px-1 w-full">
        <div class="font-bold text-sm text-black py-2">
          银行卡图片
          </div>
        <div class="flex justify-between items-center bg- rounded-lg  py-1 text-sm">

          <van-image
              width="100"
              height="100" fit="cover" 
             
              :src="bankInfo?.image"  @click="showImage(bankInfo?.image)"
            />
        </div>
      </div>
      <div class="pt-8 px-1">
          <van-button
            @click="onSubmit"
            block
            :disabled="bankInfo?.state == 0 ||  bankInfo?.state == 1"
            class="back_muli font-bold"
            style="
              background-color: #E24939;
              border: none;
              color: #fff;
              height: 50px;
            "
          >
          {{ bankInfo?.state == 0 ? '未审核' : bankInfo?.state == 1 ? '已通过' : bankInfo?.state == 2 ? '已拒绝' : '綁定银行卡'  }}
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
    <section v-else class=" h-[calc(100vh_-_48px)]">
      <div class="py-20 text-center">
        <van-empty description="还没卡包" color="#fff" style="color: white" />
        <div class="pt-3 px-5">
          <van-button
            @click="onSubmit"
            block
            class="back_muli font-bold"
            style="
              background-color: #E24939;
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
import { showToast, showLoadingToast, closeToast ,showImagePreview} from "vant";
import userApi from "@/network/user.js";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import globaljs from "@/utils/global";

const bankInfo = ref(null)

const router = useRouter();
const store = useStore();
const userInfo = computed(() => store.getters["app/ProfileInfoData"]);

const goBack = () => {
  router.push("/user");
};

const onSubmit = () => {
  router.push("/addBankCard");
};

const showImage = (image) => {
  // image = `${image}`
  if (image == null) return showToast("没有可用的图像");
  showImagePreview({
    closeable: true, 
    images: [image],
    className:'showImageClass',
    onClose() {
    },
  });
};


const getBankInfo = async () => {

  try {
    showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    const res = await userApi.getBankInfo();
    console.log(res,"bank_info**********");
    
    if (res?.data?.success == true && res?.data?.code == 200) {
      bankInfo.value = res?.data?.data
      // await globaljs.getUserInfo();
      //router.push('/user')
    }
  } catch (error) {
    closeToast();
    console.log(error);
  }
};

onMounted(() => {
  getBankInfo()
  globaljs.getUserInfo();
});
</script>
  


<style scoped>
#newmessage :deep() .van-empty__description {
  color: #333 !important;
}
._bg_main{
  background-image: url(@/assets/auth/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
</style>