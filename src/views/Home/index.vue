<template>
  <div class="w-full h-full text-center  relative home_bg pb-10     " >
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <!-- bg_flag -->
   <section class="py-5 w-full  relative  ">
    <!-- <video
      id="register_video " 
      class="register__video__3tV1S bg-cover absolute top-0 cover"
      autoplay loop muted
      preload="auto" width="100%" height="100%"
      playsInline
    >
      <source
        src="@/assets/loginVideo.mp4"
        type="video/mp4"
      />
    </video> -->
    <div class=" px-3 w-full h-10 ">
      <div  class=" relative w-full h-10    ">
        <img src="@/assets/home/notice_bg.png" alt="" class="h-full w-full object-fill">
        <div class="absolute h-full top-0 right-0 w-full ">
          <div class="w-full h-full pl-8 pr-8 ">
            <van-notice-bar  background="none" color="#333333" scrollable>
                  <div  class="">{{ noticeList?.content }}</div>
                </van-notice-bar>
          </div>
          <!-- <div class="absolute left-4 top-0  flex items-center justify-center">
                <van-badge :content="0">
               </van-badge>
            </div> -->
        </div>
      </div>
    </div>
   </section>

   <section class=" h-48   px-3 py-2">
    <div class="bg-white border-2 border-solid border-[#C2AF78] rounded h-full overflow-y-auto px-3 text-left py-2 text-sm tracking-wide">
      {{ noticeList?.home_notice_content }}
    </div>
   </section>


   
   <section class="w-full px-3 pb-4 pt-2   ">
    <section class="bg-white rounded  border-2 border-solid border-[#C2AF78] ">
    <div class="h-20 px-4   ">
     <div class="flex items-center justify-between h-full ">
      <div class="">
        <img src="@/assets/home/left_f.png" alt="left_flower" class="w-6">
      </div>
      <!-- <van-rolling-text  class="my-rolling-text  font-bold"  :start-num="0" :text-list="textList"
      :duration="1" /> -->
      <!-- <vue3-autocounter ref='counter' :startAmount='0' :endAmount='userInfo.reward_amount' :duration='3'  separator=',' decimalSeparator='.' :decimals='2' :autoinit='true' /> -->
      <div class="flex-1 text-5xl items-center justify-center font-bold text-[#E24939] tracking-[4px] flex">
        <Roller v-if="userInfo?.reward_money" class="" :value="userInfo?.reward_money?.toLocaleString()" char-set="number" mode="short" duration="2000"></Roller>
      </div>

      <div class="">
        <img src="@/assets/home/right_f.png" alt="right_flower" class="w-6">
      </div>
     </div>
    </div>
    <div  class="h-20  px-4  flex items-center justify-center">
      <!-- <img src="@/assets/home/withdraw.png" alt="withdraw" class="w-48 h-10 object-cover   "> -->
      <van-button round @click="goWithdraw()"  color="#E24939" style="font-weight: bold;font-size: 19px;" block>提 取</van-button>

    </div>
   </section>
  </section>

   <section class="w-full px-3 h-[640px]  ">
    <div class="answer_bg ">
      <div class="h-[80px] "></div>
      <div class="px-3">
        <van-row  v-for="(rowIndex) in numRows" :key="rowIndex"  gutter="1" class=" h-[130px]  "  align="center" >
 
          <van-col    span="3">
              <div class="flex items-center whitespace-nowrap ">
                <div class="font-bold text-base tracking-wide text-[#E14A39]">{{ rowIndex }}期</div>
              </div>
            </van-col>
            <!-- here need to  click testContentList array of positon 0,3,6,9 -->
            <van-col    span="5">

              <!-- @click="openTeskDialog((rowIndex - 1) * 3)" @click="showAnimation((rowIndex - 1) * 3)" -->
                <div @click="(event) => showAnimation((rowIndex - 1) * 3, event,rowIndex)"   class=" animation_d h-18 flex items-center justify-center w-full bg-[#F965B]">
                 <img src="@/assets/home/ans_1.png" alt="box" class="w-full h-full">
                </div>
            </van-col>
            <van-col   span="3">
                <div  class="flex flex-col items-center justify-center">
                  <!-- <van-icon name="success" size="25" /> -->
                <img src="@/assets/arrow-both.svg" alt="arrow-both" class="w-7">
              
                  <div class="text-xs tracking-wide text-[#333333]">2选1</div>
                </div>
            </van-col>
                        <!-- here show testContentList array of positon 1,4,7,10 -->

            <van-col   span="5">

              <!-- @click="openTeskDialog((rowIndex - 1) *  3 + 1)" @click="showAnimation((rowIndex - 1) *  3 + 1)"-->
                <div  @click="(event) => showAnimation((rowIndex - 1) * 3 + 1, event,rowIndex)" class=" animation_d h-18 flex items-center justify-center w-full bg-[#F965B]">
                  <img src="@/assets/home/ans_1.png" alt="box" class="w-full h-full">

                </div>
            </van-col>
            <van-col   span="3">
              <!-- <van-icon name="arrow-double-right" size="25" /> -->
              <div class="flex items-center justify-center ">
                <img src="@/assets/home/arrow-right.png" alt="arrow-double-right" class="w-7">
              </div>
            </van-col>
               <!-- here show testContentList array of positon 3,5,8,11  -->
            <van-col   span="5">
              <!-- @click="openTeskDialog((rowIndex - 1) * 3 + 2)"  @click="showAnimation((rowIndex - 1) * 3 + 2)" -->
                <div @click="(event) => showAnimation((rowIndex - 1) * 3 + 2, event,rowIndex)"   class=" animation_d z-10 relative flex  h-18   items-center justify-center w-full flex-col text-base font-bold text-white">
                  <!-- 免费包 -->
                   <img src="@/assets/home/crown.png" alt="crown" class="w-8 absolute -top-6">
                  <img src="@/assets/home/ans3.png" alt="box" class="w-full h-full">
                </div>
            </van-col>
     
       </van-row>
      </div>
    </div>
   </section>

   <section class="h-20"></section>
   <van-popup v-model:show="showNotice" @click-overlay="closeEvent" @close="closeEvent" @click-close-icon="closeEvent" closeable  round  position="center" class=" bg-none bg-transparent">
     <div class=" w-full    px-5 py-2  ">
      <div class="py-2 flex flex-col justify-center items-center ">
        <img :src="BaseImageUrl + noticeList?.qrcode" alt="" class="w-20">
      </div>
      <div v-html="noticeList?.content" class="text-base text-center py-2 " > </div>
      <!-- <img src="`@/assets/box.png`" alt="zoomed image" class=" w-full h-full animate-zoomInRotateX   ">   -->
     </div>
    </van-popup>
    <van-popup v-model:show="tesk_dialog" closeable  @click-close-icon="onClickCloseIcon"  position="bottom" :style="{ height: tesk_dialog_content?.type == 1 ? '40%' : '60%' }">
    <div class="py-3 px-3   relative flex items-center flex-col justify-center h-full w-full">
      <div class="text-center text-xl  inline-block  font-bold">{{ tesk_dialog_content.option }}</div>
      <!-- <div class="text-left text-base py-3 ">{{ tesk_dialog_content.explain }}</div> -->

      <section class="py-4 px-2 w-full">
        <div  @click="select_item(1)" :class="select_item_ans == 1 ? 'bg-[#f2c65d] bg-opacity-100 animate-tracking-in-expand' : 'bg-[#E24939] bg-opacity-90 '" class="h-12 rounded-lg w-full   text-[#f8f8f8] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <!-- <span class=" tracking-wider text-lg ">{{separateItem(tesk_dialog_content?.item1)?.name}}</span> -->
             <span class=" tracking-wider text-lg ">{{tesk_dialog_content?.item1}}</span>

          </div>
          <!-- <span class=" tracking-wider text-lg ">{{separateItem(tesk_dialog_content?.item1)?.price}}</span> -->
          <span class=" tracking-wider text-lg ">{{tesk_dialog_content?.money1}}</span>
        </div>
        <div v-if="tesk_dialog_content?.type == 0"  @click="select_item(2)" :class="select_item_ans == 2 ? 'bg-[#f2c65d] bg-opacity-100 animate-tracking-in-expand' : 'bg-[#E24939] bg-opacity-90 '" class="h-12 rounded-lg w-full  mt-5 text-[#f8f8f8] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <span class=" tracking-wider text-lg ">{{tesk_dialog_content?.item2}}</span>
          </div>
          <span class=" tracking-wider text-lg ">{{tesk_dialog_content?.money2}}</span>
        </div>
        <div v-if="tesk_dialog_content?.type == 0" @click="select_item(3)" :class="select_item_ans == 3 ? 'bg-[#f2c65d] bg-opacity-100 animate-tracking-in-expand' : 'bg-[#E24939] bg-opacity-90 '"  class="h-12 rounded-lg w-full  mt-5  text-[#f8f8f8] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <span class=" tracking-wider text-lg ">{{tesk_dialog_content?.item3}}</span>
          </div>
          <span class=" tracking-wider text-lg ">{{tesk_dialog_content?.money3}}</span>
        </div>
        <div class="pt-5 w-full">
          <div class="flex items-center  justify-center px-5 space-x-5 ">
            <van-button :loading="tesk_loading" :disabled="tesk_loading" @click="gopayQr(tesk_dialog_content)" round type="success" style="font-weight: bold;font-size: 16px;color:#fff" color="#E24939" block>去做任务</van-button>
            <van-button round @click="showTaskDes()"  color="#700000" style="font-weight: bold;font-size: 18px;" block>任务说明</van-button>

          </div>
        </div>
      </section>
    </div>
   </van-popup>
          <div v-if="imagePopup"  :style="zoomStyle" class="zoom-overlay">
            <div class="absolute top-2 right-3 text-black bg-white w-12 h-12 flex items-center justify-center rounded-full ">
              <van-icon name="cross" size="25" @click="closeZoom" />
            </div>
            <div class="zoomed-image w-full   ">
             <div v-if="showCrownDiv" @click="teskPopup" class="flex flex-col items-center justify-center animate-flip">
              <img src="@/assets/home/crown.png" alt="crown" class="w-20">
              <img :src="ans3_img" alt="zoomed image" class="w-48 " />
             </div>
             <div v-else  @click="teskPopup" class="flex flex-col items-center justify-center animate-flip">
              <img :src="ans1_img" alt="zoomed image" class="w-48 " />
             </div>
            </div>
          </div>

          <van-dialog v-model:show="task_explain_dialog" title="任务说明" >
            <p class="text-black px-2 py-2">{{tesk_dialog_content?.explain }}</p>
         </van-dialog>

      </van-pull-refresh>
    
  </div>
</template>


<script setup>
import { ref, computed, onMounted ,reactive} from "vue";
import homeApi from "@/network/home.js";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast,showImagePreview } from "vant";
import { useStore } from "vuex";
import homeactive from "@/assets/home/homea.svg";
import homepng from "@/assets/home/home.svg";
import globaljs from "@/utils/global";
import ans1_img from '@/assets/home/ans_1.png'
import ans3_img from '@/assets/home/ans3.png'
import { Roller } from "vue-roller";
import "vue-roller/dist/style.css";

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
const carousalImage = ref(null);
const noticeList = ref(null);
const loading = ref(false);
const zoomedImageIndex = ref(null);
const originalPosition = ref(null);
const tesk_loading = ref(false)
const select_item_ans = ref(0)
const task_explain_dialog = ref(false)
const textList = ref([
      '0,111,111',
      '0,222,222',
      '0,999,999',
      '1,000,000',
    ]);
    const zoomStyle = reactive({
      top: '0px',
      left: '0px',
      width: '100vw',
      height: '100vh',
      transform: 'scale(1)',
    });

 const userInfo = computed(()=> store.getters["app/ProfileInfoData"])
 const BaseImageUrl = computed(() => store.getters["app/BaseImageUrl"]);

// Define a computed property with a getter and setter for v-model
const showNotice = ref(false)
const showPopup = computed(() => store.getters["app/IsShowNotice"]);
// Computed property to check if zoomedImageIndex is 2, 5, 8, 11
const showCrownDiv = computed(() => {
  return [2, 5, 8, 11].includes(zoomedImageIndex.value);
});

const numRows = computed(() => Math.ceil(testContentList.value.length / 3));


const closeEvent = () => {
  //  store.commit('app/ISSHOWNOTICE',false)
  showNotice.value = false
}

const gopayQr = async (task_content) => {
  console.log(task_content,"gggggggg")
if(task_content.type == 0) {
 if(select_item_ans.value === 0) return showToast('請先選擇任務') 
  let passData = {
    task_id: task_content?.task_id,
    item_id:select_item_ans.value,
  // item_id: select_item_ans.value == 1 ? task_content.item1 :  select_item_ans.value == 2 ? task_content.item2 : task_content.item3,
    money: select_item_ans.value == 1 ? task_content.money1 :  select_item_ans.value == 2 ? task_content.money2 : task_content.money3,
    type:task_content?.type
  }
    // console.log(passData.money,"passData.money")
    //   if(userInfo?.value?.balance <= passData.money) {
    //    showToast('余额不足,请至充值页面充值！')
    //   setTimeout(() => {
    //     router.push({ name: 'Recharge', query:{url:'home'} })
    //     }, 1000);
    //  return
    // } 
  // let data = { task_id: task_content?.task_id, item_id: select_item_ans.value };
  // tesk_loading.value = true
  // showLoadingToast({
  //   message: "加载中...",
  //   forbidClick: true,
  //   loadingType: "spinner",
  // });
  // try {
  //   const res = await homeApi.getuploadTaskCertificate(data);
  //   showToast({ message: res?.data?.msg, duration: 2000 });
  //   console.log('paid getuploadTaskCertificate ', res)
  //   tesk_loading.value = false
  //   if (res?.data?.success && res?.data?.code == 200) {
  //    // carousalImage.value = res?.data?.data;
  //    tesk_dialog.value = false
  //   } else {
  //        setTimeout(() => {
  //       router.push({ name: 'Recharge', query:{url:'home'} })
  //       }, 500);
  //   }
  // } catch (error) {
  //   tesk_loading.value = false
  //   console.log(error);
  // }
 router.push({ name: 'Recharge', query: { task_content: JSON.stringify(passData) , select_item:select_item_ans.value } })
  } else {
  tesk_loading.value = true
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
  });
  let data = { task_id: task_content.task_id, item_id: 1 };
  try {
    const res = await homeApi.getuploadTaskCertificate(data);
    showToast({ message: res?.data?.msg, duration: 2000 });
    console.log('free getuploadTaskCertificate ', res)
    tesk_loading.value = false
    if (res?.data?.success && res?.data?.code == 200) {
     // carousalImage.value = res?.data?.data;
     tesk_dialog.value = false
    }
  } catch (error) {
    tesk_loading.value = false
    console.log(error);
  }
  }

}

const showTaskDes = () => {
  console.log('dddddd')
  task_explain_dialog.value = true
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

const closeZoom = () => {
  // Select all elements with the `animation_d` class
  const colElements = document.querySelectorAll('.animation_d');
  // Get the correct element based on the `zoomedImageIndex`
  const clickedElement = colElements[zoomedImageIndex.value]?.getBoundingClientRect();
  if (clickedElement) {
    // Animate back to the clicked element's original position
    zoomStyle.top = `${clickedElement.top}px`;
    zoomStyle.left = `${clickedElement.left}px`;
    zoomStyle.width = `${clickedElement.width}px`;
    zoomStyle.height = `${clickedElement.height}px`;
    zoomStyle.transform = 'scale(0.5)';

    // Wait for the transition to complete before hiding the popup
    setTimeout(() => {
      imagePopup.value = false;
    }, 500); // Match the transition duration
  } else {
    console.error("Failed to find clicked element for closing animation.");
  }
};


  const showAnimation = (index, event,rowIndexForDoTask) => {
    if(userInfo.value?.isRealName == 0) {
    showToast("请绑定 实名认证") 

     setTimeout(() => {
          router.push('/real-name')
        }, 1000);
     return
  } 
    console.log(rowIndexForDoTask,"rowIndexForDoTask") 
    switch (rowIndexForDoTask) {
      case 1:
      if(noticeList.value?.isCanDoTask1 == 0) return showToast("你没有权限执行任务") 
        break;
      case 2:
      if(noticeList.value?.isCanDoTask2 == 0) return showToast("你没有权限执行任务") 
        break;
      case 3:
      if(noticeList.value?.isCanDoTask3 == 0) return showToast("你没有权限执行任务") 
        break;
      case 4:
      if(noticeList.value?.isCanDoTask4 == 0) return showToast("你没有权限执行任务") 
        break;
      default:
        break;
    }
    // if(userInfo?.value?.balance <=0) {
    //    showToast('余额不足,请至充值页面充值！')
    //   setTimeout(() => {
    //     router.push({ name: 'Recharge', query:{url:'home'} })
    //     }, 1000);
    //  return
    // } 
  const target = event.currentTarget.getBoundingClientRect();
  // Set initial position to match the clicked element
  zoomStyle.top = `${target.top}px`;
  zoomStyle.left = `${target.left}px`;
  zoomStyle.width = `${target.width}px`;
  zoomStyle.height = `${target.height}px`;
  zoomStyle.transform = 'scale(0.5)'; // Small initial scale for zoom in effect

  zoomedImageIndex.value = index;
  imagePopup.value = true;

  // Animate to full screen after a small delay
  setTimeout(() => {
    zoomStyle.top = '0px';
    zoomStyle.left = '0px';
    zoomStyle.width = '100vw';
    zoomStyle.height = '100vh';
    zoomStyle.transform = 'scale(1)';
  }, 50);
  //here need to console.log of specific postion of array value from testContentList
  if (index < testContentList.value.length) {
    console.log(testContentList.value[index]);
    tesk_dialog_content.value = testContentList.value[index]
    // tesk_dialog.value = true
  } else {
    console.log('Index out of range');
    tesk_dialog_content.value = {}
  }
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
 const teskPopup = () => {
  closeZoom()
  tesk_dialog.value = true
 }

const onRefresh = () => {
  setTimeout(() => {
   // showToast("刷新成功");
    globaljs.getUserInfo()
    getTaskContent()
    getNotice();
   // getHomePageRotograph();
    loading.value = false;
  }, 1000);
};

const goWithdraw = () => {
  if(userInfo.value?.isRealName == 0) {
    showToast("请绑定 实名认证") 

     setTimeout(() => {
          router.push('/real-name')
        }, 1000);
  } else{
    router.push('/withdraw')
  }
}

const goMessage = () => {
  router.push('/messageList')
}

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

onMounted(() => {
  globaljs.getUserInfo()
  if (userInfo.value && userInfo.value.reward_money !== undefined) {
  // Format the reward_money number with commas
  const formattedMoney = Number(userInfo.value.reward_money).toLocaleString();
  
  // Push the formatted value to textList
  textList.value.push(formattedMoney);
}
  getTaskContent()
  getNotice();
});
</script>


<style scoped>
.answer_bg{
  /* background: #ffffff; */
  height: 100%;
  width: 100%;
  background-image: url(@/assets/home/answer_bg.png);
  background-repeat: no-repeat;
 background-size: 100% 100%;
  /* background-size: 100% 100%; */
}
.bg_flag{
    /* background-image: url(@/assets/home/flag.png); */
  background-repeat: no-repeat;
  background-size:cover;
}
.home_bg{
  /* background: #700000; */
  height: calc(100vh - 68px);
  overflow-y: auto;
  width: 100%;
  /* background-image: url(@/assets/home/home_bg.png);
  background-repeat: no-repeat;
  background-size: cover;  */
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
  --van-rolling-text-font-size: 38px;
  --van-rolling-text-gap: 3px;
  --van-rolling-text-item-border-radius: 5px;
  --van-rolling-text-item-width: 20px;

}

/* .zoom-overlay {
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
} */

.zoom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: top 0.5s ease, left 0.5s ease, width 0.5s ease, height 0.5s ease, transform 0.5s ease;
}

.zoomed-image {
  max-width: 90%;
  max-height: 90%;
}

</style>
