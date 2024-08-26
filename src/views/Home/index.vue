<template>
  <div class="w-full h-full text-center  relative home_bg   " >
    <section class="bg-[#f0eaea] pt-2">
        <div @click="goNotice" class="w-full px-4 mx-auto flex items-center justify-between ">
            <div class="w-6 h-6 rounded-full bg-[#ed155e] flex items-center justify-center">
              <img src="@/assets/user/sound.svg" alt="sound" class="w-4">
            </div>
            <div class="flex-1 ">
                <van-notice-bar  background="#f0eaea" color="#000" scrollable text="★★★尊敬的客户：我司亚博体育场馆比分系统于2020年7月7日（星期二）11:00-13:35进行滚球比分系统维护，维护期间将无法查看比分，可以正常游戏，给您带来不便敬请谅解，谢谢。" />
            </div>
            <div class="relative">
                <van-badge :content="1">
                  <img src="@/assets/user/notice_fill.svg" alt="button_more" class=" w-6">
               </van-badge>
            </div>
        </div>
    </section>
    <section class=" w-full  relative px-4 py-4  ">
      <!-- <img src="@/assets/loginbg.jpg" alt="loginbg" class="w-full h-full relative"> -->
       <div class="px-4 bg-[#fd3130] h-48 w-full rounded-sm">
       <div class="h-full flex items-center w-full  relative justify-center space-x-2 text-[#f2cd78]">
        <van-icon name="cash-o" size="45" color="#fcd24c" />
        <!-- <div ref="animationRollingnumber" class="text-4xl font-bold">1,000,000</div> -->
        <!-- <div class="number-container relative overflow-hidden h-14   flex items-center justify-center">
          <transition-group name="rolling" tag="div" class="text-4xl font-bold">
            <div :key="formattedNumber" class="number-item h-full flex items-center justify-center">
              {{ formattedNumber }}
            </div>
          </transition-group>
        </div> -->
        <van-rolling-text  class="my-rolling-text"  :start-num="0"
        :target-num="1000000" :duration="1" />
        <div class="absolute bottom-7 right-7  flex items-center justify-end w-full  ">
        <div class="bg-blue-500 text-[#ffffff] text-base  px-6 py-2 font-bold">提取</div>
        </div>
       </div>

      </div>
    </section>
    <section class="py-1 w-full flex items-center justify-center">
      <div class="bg-[#7193ed] text-[#f2c65d] py-2 px-7 font-bold rounded-full text-base tracking-wider">任务任务图</div>
    </section>
    <section class="py-3 w-full px-4 ">
      <van-row gutter="5" class="py-3"  align="center" >
            <van-col   span="3">
              <div class="flex items-center">
                <div class="font-bold text-lg tracking-wide text-[#f2c65d]">1期</div>
              </div>
            </van-col>
            <van-col   span="5">
                <div class=" h-16 flex items-center justify-center w-full bg-[#f2c65d]">1期</div>
            </van-col>
            <van-col   span="3">
                <div class="flex flex-col items-center justify-center">
                  <van-icon name="success" size="25" />
                  <div class="text-sm">2选1</div>
                </div>
            </van-col>
            <van-col   span="5">
                <div class=" h-16 flex items-center justify-center w-full bg-[#f2c65d]">1期</div>
            </van-col>
            <van-col   span="3">
              <van-icon name="arrow-double-right" size="25" />
            </van-col>
            <van-col   span="5">
                <div class=" h-16 flex items-center justify-center w-full bg-[#9f5ce0] text-base font-bold text-white">免费包</div>
            </van-col>
           
       </van-row>
       <!-- <div v-for="m in 3" :key="m" class="flex items-center justify-center px-3 py-4 w-full  ">
    <div v-for="n in 3" :key="n" class="flex w-full items-center justify-center  ">
      <div
        @click="toggleCard(m, n)"
        :class="['card bg-red-500 ', { 'is-flipped': isFlipped(m, n) }]"
      >
        <div class="card-inner  h-20 ">
          <div class="card-front text-center   flex items-center justify-center  ">
            Step {{ n }}
          </div>
          <div class="card-back text-center w-full flex items-center justify-center ">
            Content for Step {{ n }}
          </div>
        </div>
      </div>
      <div class="flex-1" v-if="n !== 3">
        <van-icon name="arrow-double-right" />
      </div>
    </div>
  </div> -->


      <!-- <div class="w-full flex">
        <div @click="openCard()" class="w-1/3 text-center  bg-blue-500 flex items-center justify-center h-20">
        Step 1
      </div>
      <div class="flex-1 flex items-center justify-center">
        <van-icon name="arrow-double-right" />
      </div>
      <div @click="openCard()" class="w-1/3 text-center bg-blue-500 flex items-center justify-center h-20">
        Step 2
      </div>
      <div class="flex-1 flex items-center justify-center">
        <van-icon name="arrow-double-right" />
      </div>
      <div @click="openCard()" class="w-1/3 text-center bg-blue-500 flex items-center justify-center h-20">
        Step 3
      </div>
      </div> -->
 



    </section>

  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import homeApi from "@/network/home.js";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import { useStore } from "vuex";
import homeactive from "@/assets/home/homea.svg";
import homepng from "@/assets/home/home.svg";

const router = useRouter();
const store = useStore();
const step_card =  [1, 2, 3];;
const openIndex = ref(null);

const currentNumber = ref(2000); // Start from 2000
    const targetNumber = ref(1000000); // The final number to reach
    const duration = 1000; // 10 seconds
    const steps = 100; // Number of steps (You can increase for smoother transitions)
    const increment = ref((targetNumber.value - currentNumber.value) / steps);
    const interval = ref(duration / steps);

const imageShow = ref(false)
const imageurl = ref([])

    // Keeps track of flipped cards in a nested array format
    const flippedCards = ref(new Map());

    const toggleCard = (m, n) => {
      const key = `${m}-${n}`;
      const currentFlipped = flippedCards.value.get(key) || false;
      flippedCards.value.set(key, !currentFlipped);
    };

    const isFlipped = (m, n) => {
      const key = `${m}-${n}`;
      return flippedCards.value.get(key) || false;
    };


    const openCard = () => {

    }

function startAnimation() {
      const step = () => {
        if (currentNumber.value < targetNumber.value) {
          currentNumber.value = Math.min(currentNumber.value + increment.value, targetNumber.value);
          setTimeout(step, interval.value);
        }
      };
      step();
    }



const gameAddressList = ref(null);
const carousalImage = ref(null);
const noticeList = ref(null);
const loading = ref(false);

const loginInfo = computed(() => store.getters["app/LoginData"]);
const formattedNumber = computed(() => currentNumber.value.toLocaleString());

//The list of pictures in the middle, click to enter and browse the article
const goDetail = (id) => {
  router.push({ name: "HomeDetails", query: { id: id } });
};
const goCarousal = () => {
  router.push({ name: "HomeDetails" });
};

// const showImage = (image) => {
//    image = `https://sxh-cn.oss-cn-hongkong.aliyuncs.com/${image}`
//    imageurl.value = [image]
//   imageShow.value = true
// }

const showImage = (image) => {
  image = `https://sxh-cn.oss-cn-hongkong.aliyuncs.com/${image}`
  if (image == null) return showToast("没有可用的图像");
  showImagePreview({
    closeable: true, 
    images: [image],
    className:'showImageClass',
    onClose() {
    },
  });
};

const onRefresh = () => {
  setTimeout(() => {
   // showToast("刷新成功");
    getHomePageArticleList();
    getNotice();
    getHomePageRotograph();
    loading.value = false;
  }, 1000);
};

const getHomePageArticleList = async () => {
  try {
    const res = await homeApi.getHomePageArticleList();
    if (res?.data?.success && res?.data?.code == 200) {
      gameAddressList.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getNotice = async () => {
  try {
    const res = await homeApi.getNotice();
    if (res?.data?.success && res?.data?.code == 200) {
      noticeList.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

//for carousalImage
const getHomePageRotograph = async () => {
  let data = { address: 1 };
  try {
    const res = await homeApi.getHomePageRotograph(data);
    console.log('cccccccccccc ', res)
    if (res?.data?.success && res?.data?.code == 200) {
      carousalImage.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getHomePageRotograph();
  getHomePageArticleList();
  getNotice();
  startAnimation()
});
</script>


<style scoped>
.home_bg{
  height: calc(100vh - 68px);
  /* background: #f; */
  overflow-y: auto;
  /* background: #050a30; */
}
.rolling-enter-active {
  transition: transform 0.3s ease-out;
}

.rolling-enter-from {
  transform: translateY(100%); /* Start below */
}

.rolling-enter-to {
  transform: translateY(0); /* End in position */
}

.rolling-leave-active {
  transition: transform 0.1s ease-out;
}

.rolling-leave-to {
  transform: translateY(-100%); /* Move above */
}
.number-item {
  display: flex;
  align-items: center;
  justify-content: center;
  /* transform: translateY(100%); Start below */
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1000px;
}

.card-inner {
  /* display: flex;
  align-items: center;
  justify-content: center; */

  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #f2cd78 !important;
}


.card-back {
  transform: rotateY(180deg);
}

.is-flipped .card-inner {
  transform: rotateY(180deg);
}
</style>

<style>

.my-rolling-text {
  /* --van-rolling-text-background: #1989fa; */
  --van-rolling-text-color: #f2cd78;
  --van-rolling-text-font-size: 30px;
  --van-rolling-text-font-weight:bold;
  --van-rolling-text-gap: 8px;
  --van-rolling-text-item-border-radius: 8px;
  font-weight: 700;
  /* --van-rolling-text-item-width: 40px; */
}
</style>