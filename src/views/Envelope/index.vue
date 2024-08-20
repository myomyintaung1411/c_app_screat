<template>
  <div class="w-full  relative bg_envelope pb-20 ">
    <div class="h-96 tab_color bor w-full rounded-b-3xl  px-3 text-base font-bold relative" >
      <div class="h-12 text-center flex items-center justify-center relative">
        <div>打卡</div>
        <div @click="goDetail" class="absolute right-3 text-sm tracking-wider">领取记录</div>
      </div>
      <div class=" py-5 flex items-center justify-around mt-5 ">
        <div class="flex flex-col text-center">
          <span  class=" text-lg text-white">￥{{userInfo?.redpackage_score?.toFixed(2)}}</span>
          <span class=" text-sm text-[#F2BE22]">打卡积分</span>
        </div>
          <div class="flex flex-col text-center ">
          <span class=" text-lg text-white">￥{{userInfo?.balance?.toFixed(2)}}</span>
          <span class=" text-sm text-[#F2BE22]">余额</span>
        </div>
      </div>
      <div class="px-5  w-full mt-10 ">
        <div class="bg-white h-[500px] rounded-xl w-full relative ">
          <div class="relative flex flex-col justify-center items-center rounded-t-xl h-40 bg-gray-100 rounded-b-[50%]">
           <div class="flex items-center justify-center absolute -top-10 left-0 w-full">
            <img src="@/assets/box.png" alt="box" class="w-28">
          </div>
          <div class="text-black font-bold pt-10 tracking-widest text-sm">打卡签到每日领福利</div>
          </div>
          <div class="flex items-center justify-center text-white h-[340px]">
              <div
                  @click="getRedpack" class=" bg-[#4286f5] bg-opacity-70 shadow-2xl w-48 h-48   flex items-center justify-center text-6xl"
                 style="  border-radius: 50%;" >  打卡 </div>
          </div>
        </div>
      </div>
    </div>
   
    <!-- <div class="text-center flex items-center flex-col justify-center">
      <div
        class="relative bg_envelope w-full"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
        style="display: flex; justify-content: center; align-item: center;"
      >
      <div
        @click="getRedpack" class=" bg-white bg-opacity-20 shadow  absolute bottom-20 flex items-center justify-center text-6xl"
        style="width: 200px; height: 200px;  border-radius: 50%;"
      >
      打卡
      </div>
      <div
          @click="goDetail"
          class="absolute top-3 text-white right-3 text-base tracking-wider flex items-center justify-center z-20"
        >
          <span>领取记录</span>
        </div>
      </div>
    </div> -->
    

    <van-dialog
      class="dialog"
      v-model:show="congrazDialog"
      :show-cancel-button="false"
      confirm-button-text="确认"
      theme="round-button"
      @confirm="confirmDialog"
    >
      <template #title>
        <van-icon name="certificate" size="50" color="green" />
        <h3 class="title">恭喜！</h3>
      </template>

      <div class="content text-black px-2 text-center">
        <span
          >你有
          <span class="text_color">{{ RedpackData?.month }} 元</span>
          已成功领取</span
        >
      </div>

      <div class="confetti-container"></div>
    </van-dialog>
  </div>
</template>


<script setup>
import { computed, onMounted, ref, nextTick } from "vue";
import homeApi from "@/network/home.js";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast } from "vant";
import { useStore } from "vuex";
import globaljs from "@/utils/global";

const router = useRouter();
const store = useStore();
const RedpackData = ref(null);
const congrazDialog = ref(false);
const userInfo = computed(()=> store.getters["app/ProfileInfoData"])



const goDetail = () => {
  router.push("/envelopeRecord");
};

const confirmDialog = () => {
  congrazDialog.value = false;
};

const showConfetti = () => {
  congrazDialog.value = true;
  // use nextTick to wait for the DOM to update before querying the container element
  nextTick(() => {
    const container = document.querySelector(".confetti-container");
    if (container) {
      const confettiCount = 100;
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(confetti);
      }
    }
    const firework = document.querySelector(".firework");
    if (firework) {
      const beforeExplosion = document.querySelector(".before-explosion");
      const explosion = document.querySelector(".explosion");
      beforeExplosion.addEventListener("animationend", () => {
        beforeExplosion.style.display = "none";
        explosion.style.display = "block";
      });
    }
  });
};

const getRedpack = async () => {
  try {
    showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    const res = await homeApi.getRedpack();
    if (res?.data?.success == true && res?.data?.code == 200) {
      RedpackData.value = res?.data?.data;
      showToast(res?.data?.msg);
      showConfetti();
    } else {
      showToast(res?.data?.msg);
      congrazDialog.value = false;
    }
  } catch (error) {
    congrazDialog.value = false;
    console.log(error);
  }
};

onMounted(() => {
  globaljs.getUserInfo();
});
</script>


<style scoped>
.bg_envelope {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>