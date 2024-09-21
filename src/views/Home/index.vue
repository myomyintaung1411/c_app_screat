<template>
  <div class="w-full h-full text-center  relative home_bg pb-10     " >
   <section class="py-3 w-full h-64 ">
    <div class=" px-3 w-full h-10 ">
      <div class=" relative w-full h-10    ">
        <img src="@/assets/home/notice_bg.png" alt="" class="h-full w-full object-fill">
        <div class="absolute h-full top-0 right-0 w-full ">
          <div class="w-full h-full pl-8 ">
            <van-notice-bar  background="none" color="#fff" scrollable>
                  <div  class="">{{ noticeList?.content }}</div>
                </van-notice-bar>
          </div>
        </div>
      </div>
    </div>
   </section>
   
   <section class="h-40   w-full px-3 bg-transparent ">
    <div class="h-20">
     <div class="flex items-center justify-center h-full">
      <van-rolling-text  class="my-rolling-text  font-bold"  :start-num="0" :text-list="textList"
      :duration="1" />
     </div>
    </div>
    <div class="h-20 flex items-center justify-center">
      <img src="@/assets/home/withdraw.png" alt="withdraw" class="w-48 ">
    </div>
   </section>

   <section class="w-full px-3 h-[460px]">
    <div class="answer_bg">
      <div class="h-[60px] "></div>
      <div class="px-3">
        <van-row  v-for="(rowIndex) in numRows" :key="rowIndex"  gutter="1" class="h-[100px]"  align="center" >
            <van-col    span="3">
              <div class="flex items-center whitespace-nowrap">
                <div class="font-bold text-base tracking-wide text-[#fff]">{{ rowIndex }}期</div>
              </div>
            </van-col>
            <!-- here need to  click testContentList array of positon 0,3,6,9 -->
            <van-col    span="5">
              <!-- @click="openTeskDialog((rowIndex - 1) * 3)" -->
<<<<<<< HEAD
                <div @click="showAnimation((rowIndex - 1) * 3)"  class=" h-16 flex items-center justify-center w-full bg-[#F965B]">
                 <img src="@/assets/home/ans_1.png" alt="box" class="w-full h-full">
=======
                <div @click="showAnimation((rowIndex - 1) * 3)"  class=" h-16 flex items-center justify-center w-full bg-[#f2c65d]">
                 <img src="@/assets/box.png" alt="box" class="w-full h-full">
>>>>>>> 45f60d11597eeb5dd9ed9330ecdb9308800867e1
                </div>
            </van-col>
            <van-col   span="3">
                <div  class="flex flex-col items-center justify-center">
                  <!-- <van-icon name="success" size="25" /> -->
                <img src="@/assets/arrow-both.svg" alt="arrow-both" class="w-7">
              
                  <div class="text-xs tracking-wide text-white">2选1</div>
                </div>
            </van-col>
                        <!-- here show testContentList array of positon 1,4,7,10 -->

            <van-col   span="5">
              <!-- @click="openTeskDialog((rowIndex - 1) *  3 + 1)" -->
<<<<<<< HEAD
                <div @click="showAnimation((rowIndex - 1) *  3 + 1)" class=" h-16 flex items-center justify-center w-full bg-[#F965B]">
                  <img src="@/assets/home/ans_1.png" alt="box" class="w-full h-full">
=======
                <div @click="showAnimation((rowIndex - 1) *  3 + 1)" class=" h-16 flex items-center justify-center w-full bg-[#f2c65d]">
                  <img src="@/assets/box.png" alt="box" class="w-full h-full">
>>>>>>> 45f60d11597eeb5dd9ed9330ecdb9308800867e1

                </div>
            </van-col>
            <van-col   span="3">
              <!-- <van-icon name="arrow-double-right" size="25" /> -->
              <div class="flex items-center justify-center ">
                <img src="@/assets/home/arrow-right.png" alt="arrow-double-right" class="w-7">
              </div>
            </van-col>
               <!-- here show testContentList array of positon 3,5,8,11 -->
            <van-col   span="5">
              <!-- @click="openTeskDialog((rowIndex - 1) * 3 + 2)" -->
<<<<<<< HEAD
                <div  @click="showAnimation((rowIndex - 1) * 3 + 2)"  class=" z-10 relative flex  h-16   items-center justify-center w-full flex-col text-base font-bold text-white">
                  <!-- 免费包 -->
                   <img src="@/assets/home/crown.png" alt="crown" class="w-8 absolute -top-6">
                  <img src="@/assets/home/ans3.png" alt="box" class="w-full h-full">
=======
                <div  @click="showAnimation((rowIndex - 1) * 3 + 2)"  class=" h-16 flex items-center justify-center w-full bg-[#fd3130] text-base font-bold text-white">
                  <!-- 免费包 -->
                  <img src="@/assets/box.png" alt="box" class="w-full h-full">
>>>>>>> 45f60d11597eeb5dd9ed9330ecdb9308800867e1
                </div>
            </van-col>
       </van-row>
      </div>
    </div>
<<<<<<< HEAD
   </section>
=======
  </div> -->


  <van-popup v-model:show="tesk_dialog" closeable  @click-close-icon="onClickCloseIcon"  position="bottom" :style="{ height: '60%' }">
    <div class="py-3 px-3   relative flex items-center flex-col justify-center h-full w-full">
      <div class="text-center text-xl  inline-block  font-bold">{{ tesk_dialog_content.option }}</div>
      <section class="py-4 px-2 w-full">
        <div  @click="select_item(1)" :class="select_item_ans == 1 ? 'bg-[#f2c65d] bg-opacity-100' : 'bg-[#fe2c2b] bg-opacity-90'" class="h-12 rounded-lg w-full   text-[#f8f8f8] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <!-- <span class=" tracking-wider text-lg ">{{separateItem(tesk_dialog_content?.item1)?.name}}</span> -->
             <span class=" tracking-wider text-lg ">大麦</span>

          </div>
          <!-- <span class=" tracking-wider text-lg ">{{separateItem(tesk_dialog_content?.item1)?.price}}</span> -->
          <span class=" tracking-wider text-lg ">{{tesk_dialog_content?.item1}}</span>
        </div>
        <div  @click="select_item(2)" :class="select_item_ans == 2 ? 'bg-[#f2c65d] bg-opacity-100' : 'bg-[#fe2c2b] bg-opacity-90'" class="h-12 rounded-lg w-full  mt-5 text-[#f8f8f8] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <span class=" tracking-wider text-lg ">小麦</span>
          </div>
          <span class=" tracking-wider text-lg ">{{tesk_dialog_content?.item2}}</span>
        </div>
        <div @click="select_item(3)" :class="select_item_ans == 3 ? 'bg-[#f2c65d] bg-opacity-100' : 'bg-[#fe2c2b] bg-opacity-90'"  class="h-12 rounded-lg w-full  mt-5  text-[#f8f8f8] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <span class=" tracking-wider text-lg ">玉米</span>
          </div>
          <span class=" tracking-wider text-lg ">{{tesk_dialog_content?.item3}}</span>
        </div>
        <div class="pt-5 w-full">
          <div class="flex items-center  justify-center px-10 space-x-5 ">
            <van-button round type="success" style="font-weight: bold;font-size: 16px;color:#000" color="#ccc" block>去做住客</van-button>
            <van-button round  color="#fe2c2b" style="font-weight: bold;font-size: 18px;" block>任务玩明</van-button>

          </div>
        </div>
      </section>
    </div>
   </van-popup>

   <!-- <div v-if="zoomedImageIndex !== null" class="zoom-overlay " @click="closeZoom"> -->
    <!-- <van-popup v-model:show="imagePopup"  position="center"  >
      <div class=" ">
        <img src="`@/assets/box.png`" alt="zoomed image" class="zoomed-image animate-flip">  
      </div>
    </van-popup> -->

    <van-popup v-model:show="imagePopup" style="background: none;"  position="center" class=" bg-none bg-transparent">
     <div class=" w-full h-64    ">
      <img src="`@/assets/box.png`" alt="zoomed image" class=" w-full h-full animate-zoomInRotateX   ">  
     </div>
    </van-popup>

    <!-- <div v-if="zoomedImageIndex !== null" class="zoom-overlay " >
      <div class="absolute  top-2 right-3 text-white">
        <van-icon name="cross" size="25" @click="closeZoom" />
      </div>
      <img src="`@/assets/box.png`" alt="zoomed image" class="zoomed-image animate-fadefromTop">  
    </div> -->

    <van-popup v-model:show="showNotice" @click-overlay="closeEvent" @close="closeEvent" @click-close-icon="closeEvent" closeable  round  position="center" class=" bg-none bg-transparent">
     <div class=" w-full    px-5 py-2  ">
      <div class="py-2 flex flex-col justify-center items-center ">
        <img src="@/assets/box.png" alt="" class="w-20">
      </div>
      <div v-html="noticeList?.content" class="text-base text-center " > </div>
      <!-- <img src="`@/assets/box.png`" alt="zoomed image" class=" w-full h-full animate-zoomInRotateX   ">   -->
     </div>
    </van-popup>


    </section>
>>>>>>> 45f60d11597eeb5dd9ed9330ecdb9308800867e1

   <section class="h-20"></section>
    
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
import boxImage from "@/assets/box.png";

const router = useRouter();
const store = useStore();
const step_card =  [1, 2, 3];
const background = '#f0eaea';
const color = '#000';
const testContentList = ref([])
const openIndex = ref(null);
const tesk_dialog = ref(false)
const imagePopup = ref(false)
const noticeDialog = ref(true)
const tesk_dialog_content = ref({})
const personalMessage = ref(null);
const carousalImage = ref(null);
const noticeList = ref(null);
const loading = ref(false);
const zoomedImageIndex = ref(null);
const select_item_ans = ref(0)
const textList = ref([
      '0,111,111',
      '0,222,222',
      '0,333,333',
      '0,444,444',
      '0,777,777',
      '0,999,999',
      '1,000,000',
    ]);
const loginInfo = computed(() => store.getters["app/LoginData"]);
// Define a computed property with a getter and setter for v-model
const showNotice = ref(false)
const showPopup = computed(() => store.getters["app/IsShowNotice"]);

// const showPopup = computed({
//   get() {
//     return store.getters["app/IsShowNotice"];
//   },
//   set(value) {
//     store.commit("app/ISSHOWNOTICE", value);
//   }
// });
const formattedNumber = computed(() => currentNumber.value.toLocaleString());
const numRows = computed(() => Math.ceil(testContentList.value.length / 3));

//The list of pictures in the middle, click to enter and browse the article
const goDetail = (id) => {
  router.push({ name: "HomeDetails", query: { id: id } });
};
const goCarousal = () => {
  router.push({ name: "HomeDetails" });
};

const closeEvent = () => {
  //  store.commit('app/ISSHOWNOTICE',false)
  showNotice.value = false
}

const onClickCloseIcon = () => {
  select_item_ans.value = 0
  tesk_dialog_content.value = {}
}

const select_item = (index) => {
  select_item_ans.value = index
}

const getItem = (index) => {
  return testContentList.value[index] || {};
};

  // Function to separate item into name and price
  function separateItem(item) {
    if (!item) return { name: '', price: '' };

    // Regular expression to match the name and price
    const match = item.match(/(\D+)(\d+元)/);
    if (match) {
      return { name: match[1], price: match[2] };
    }
    return { name: '', price: '' };
  }

  const showAnimation = (index) => {
    imagePopup.value = true
    zoomedImageIndex.value = index;
    console.log(index,"dd")
    console.log(testContentList.value[index]);
  }

  const closeZoom = () => {
  zoomedImageIndex.value = null;
};

const openTeskDialog = (index) => {
      //here need to console.log of specific postion of array value from testContentList
      if (index < testContentList.value.length) {
        console.log(testContentList.value[index]);
        tesk_dialog_content.value = testContentList.value[index]
        tesk_dialog.value = true
      } else {
        console.log('Index out of range');
        tesk_dialog_content.value = {}
      }
    }

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
    //getHomePageArticleList();
    getNotice();
   // getHomePageRotograph();
    loading.value = false;
  }, 1000);
};

const getTaskContent = async () => {
  try {
    const res = await homeApi.getTaskContentApi();
    if (res?.data?.success && res?.data?.code == 200) {
      testContentList.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
const setPersonalMessage = async () => {
  try {
    const res = await homeApi.setPersonalMessage();
    if (res?.data?.success && res?.data?.code == 200) {
      personalMessage.value = res?.data?.data;
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
      // Show popup only if it hasn't been shown yet
      if (!showPopup.value) {
       showNotice.value = true
      }
      store.commit("app/ISSHOWNOTICE", true);

    }
  } catch (error) {
    console.log(error);
  }
};

const getQuestion = async () => {
  let data = { username: 'mma123', password: '123AAA'};
  try {
    const res = await homeApi.getQuestion(data);
    console.log('getQuestion ', res)
    if (res?.data?.success && res?.data?.code == 200) {
      carousalImage.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getTaskContent()
  setPersonalMessage()
  getNotice();
});
</script>


<style scoped>
.answer_bg{
  background: #700000;
  height: 100%;
  width: 100%;
  background-image: url(@/assets/home/answer_bg.png);
  background-repeat: no-repeat;
  /* background-size: cover; */
  background-size: 100% 100%;
}
.home_bg{
  background: #700000;
  height: calc(100vh - 68px);
  /* overflow-y: auto; */
  width: 100%;
  background-image: url(@/assets/home/home_bg.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.notice_section{
  background-image: url(@/assets/home/notice_bg.png);
  background-repeat: no-repeat;
  background-size: contain 100%;
  /* background-position: top; */
}
.custom-notice-bar {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  /* padding: 10px; */
  box-sizing: border-box;
}

.notice-content {
  display: inline-block;
  animation: scroll 10s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
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

.my-rolling-text {
  /* --van-rolling-text-background: #1989fa; */
  --van-rolling-text-color: #f2cd78;
  --van-rolling-text-font-size: 35px;
  --van-rolling-text-gap: 1px;
  --van-rolling-text-item-border-radius: 5px;
  --van-rolling-text-item-width: 18px;

}

.zoom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.zoomed-image {
  max-width: 90%;
  max-height: 90%;
  transition: transform 0.3s ease;
}

.zoomed-image:hover {
  transform: scale(1.1);
}
</style>
