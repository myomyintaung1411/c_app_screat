<template>
  <div class="w-full relative bg-[#700000]  h-[calc(100vh_-_68px)]  overflow-y-auto  pb-10  ">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <section class="w-full   relative">
    <div class=" w-full rounded-b-[50%] bg-[#830009] pb-2  ">
     <section  class="w-full px-4 flex items-center justify-between  pt-6 relative">
      <div @click="goProfileInfo" class="flex items-center space-x-3">
        <img :src="avatar" alt="avatar" class="w-16">
        <span class="text-white font-bold text-xl">{{ userInfo?.name }}</span>
      </div>
      <div>
        <img src="@/assets/user/service.png" alt="service" class="w-9">
      </div>
     </section>
     <section class="flex items-center w-full justify-center px-4 pt-6">
      <van-row  gutter="12">
        <van-col span="12">
          <div @click="goWithdraw" class="relative h-20 ">
            <img src="@/assets/user/11.png" alt="11" class=" w-full h-full">
           <div class="absolute w-full h-full top-0 left-0 right-0">
            <div class="pl-11 text-base pt-3 text-white">余额</div>
            <div class="pl-5 text-xl tracking-wide font-bold pt-1 text-white">{{userInfo?.balance}}</div>
           </div>
          </div>
        </van-col>
        <van-col span="12">
          <div @click="goWithdraw" class="relative h-20 ">
            <img src="@/assets/user/11.png" alt="11" class="h-full w-full ">
           <div class="absolute w-full h-full top-0 left-0 right-0">
            <div class="pl-11 text-base pt-3 text-white">推荐金</div>
            <div class="pl-5 text-xl tracking-wide font-bold pt-1 text-white">{{userInfo?.referral_score}}</div>
           </div>
          </div>
        </van-col>
      </van-row>
     </section>
    </div>
   </section>

   <section class="w-full relative px-4 pt-3">
    <div class="bg_ans_sec relative ">
      <div class="h-20"></div>
      <!-- <div class="text-center text-white  w-full px-3 text-ellipsis overflow-hidden ">
        {{ questionData?.question }}
      </div> -->
      <div class="  h-44   relative px-3 flex flex-col items-center justify-center   ">
        <!-- <div class="h-20 flex items-center justify-between">
          <div class="relative w-full">
            <img src="@/assets/user/ans_box.png" alt="ans" class="w-1/2">
          </div>
          <div class="relative">
            <img src="@/assets/user/ans_box.png" alt="ans" class="w-1/2">
          </div>
        </div> -->
        <van-row gutter="12" class="w-full px-2 ">
          <van-col span="12">
         <!-- <section class="h-16 flex items-center justify-center ">
          <div class="relative w-full h-10  ">
              <img src="@/assets/user/ans_box.png" alt="ans" class="h-full w-full" >
              <div class="absolute h-full w-full right-0 left-0 top-0 flex items-center ">
                <div class="pl-4  text-base text-[#830009]">A</div>
                <div class="pl-5 text-white text-sm tracking-wider text-ellipsis overflow-hidden">{{questionData?.answer1}}</div>
              </div>
            </div>
        </section> -->
        <div class="h-16  w-full  ">
          <div @click="clickAns(1,questionData?.answer1)" :class="select_ans === 1 ? 'bg-[#a9000a]   border-[#ff4855]' : 'bg-[#853333]   border-white'" class="h-10 relative rounded-full   border-2 ">
            <div class="absolute -left-2 -top-1  bg-[#fddfb9] text-[#96000b] w-10 h-10 flex items-center justify-center rounded-full">
                    A
            </div>
            <div class="flex items-center justify-center h-full text-white w-full pl-9  text-ellipsis overflow-x-hidden">
               <div class="w-full whitespace-nowrap overflow-hidden text-ellipsis ">{{questionData?.answer1}}</div>
            </div>
          </div>
        </div>
          </van-col>
          <van-col span="12">
          <div class="h-16  w-full   ">
          <div @click="clickAns(2,questionData?.answer2)" :class="select_ans === 2 ? 'bg-[#a9000a]   border-[#ff4855]' : 'bg-[#853333]   border-white'"  class="h-10 relative rounded-full w-full  border-2 ">
            <div class="absolute -left-2 -top-1  bg-[#fddfb9] text-[#96000b] w-10 h-10 flex items-center justify-center rounded-full">
                    B
            </div>
            <div class="flex items-center justify-center h-full text-white w-full pl-9  text-ellipsis overflow-x-hidden">
               <div class="w-full whitespace-nowrap overflow-hidden text-ellipsis ">{{questionData?.answer2}}</div>
            </div>
          </div>
        </div>
         <!-- <section class="h-16 flex items-center justify-center">
            <div class="relative w-full h-10 ">
              <img src="@/assets/user/ans_box.png" alt="ans" class="h-full w-full" >
              <div class="absolute h-full w-full right-0 left-0 top-0 flex items-center ">
                <div class="pl-4  text-base text-[#830009]">B</div>
                <div class="pl-5 text-white text-sm tracking-wider text-ellipsis overflow-hidden">{{questionData?.answer2}}</div>
              </div>
            </div>
        </section> -->
          </van-col>
        </van-row>
        <van-row gutter="12" class="w-full px-1">
          <van-col span="12">
         <!-- <section class="h-16 flex items-center justify-center">
          <div class="relative w-full h-10 ">
              <img src="@/assets/user/ans_box.png" alt="ans" class="h-full w-full" >
              <div class="absolute h-full w-full right-0 left-0 top-0 flex items-center ">
                <div class="pl-4  text-base text-[#830009]">C</div>
                <div class="pl-5 text-white text-sm tracking-wider text-ellipsis overflow-hidden">{{questionData?.answer3}}</div>
              </div>
            </div>
        </section> -->
        <div class="h-16  w-full  ">
          <div @click="clickAns(3,questionData?.answer3)" :class="select_ans === 3 ? 'bg-[#a9000a]   border-[#ff4855]' : 'bg-[#853333]   border-white'" class="h-10 relative rounded-full  border-2  ">
            <div class="absolute -left-2 -top-1  bg-[#fddfb9] text-[#96000b] w-10 h-10 flex items-center justify-center rounded-full">
                    C
            </div>
            <div class="flex items-center justify-center h-full text-white w-full pl-9  text-ellipsis overflow-x-hidden">
               <div class="w-full whitespace-nowrap overflow-hidden text-ellipsis ">{{questionData?.answer3}} </div>
            </div>
          </div>
        </div>
          </van-col>
          <van-col span="12">
         <!-- <section class="h-16 flex items-center justify-center">
          <div class="relative w-full h-10 ">
              <img src="@/assets/user/ans_box.png" alt="ans" class="h-full w-full" >
              <div class="absolute h-full w-full right-0 left-0 top-0 flex items-center ">
                <div class="pl-4  text-base text-[#830009] ">D</div>
                <div class="pl-5 text-white text-sm tracking-wider text-ellipsis overflow-hidden">{{questionData?.answer4}}</div>
              </div>
            </div>
        </section> -->
        <div class="h-16  w-full  ">
          <div @click="clickAns(4,questionData?.answer4)" :class="select_ans === 4 ? 'bg-[#a9000a]   border-[#ff4855]' : 'bg-[#853333]   border-white'" class="h-10 relative rounded-full  border-2 ">
            <div class="absolute -left-2 -top-1  bg-[#fddfb9] text-[#96000b] w-10 h-10 flex items-center justify-center rounded-full">
                    D
            </div>
            <div class="flex items-center justify-center h-full text-white w-full pl-9  text-ellipsis overflow-x-hidden">
               <div class="w-full whitespace-nowrap overflow-hidden text-ellipsis ">{{questionData?.answer4}} </div>
            </div>
          </div>
        </div>
          </van-col>
        </van-row>
        <div class="image_div w-full h-12 px-10">
          <img @click="submitAns" src="@/assets/ans_button.png" alt="ans_button" class="w-full h-full object-contain ">
        </div>
      </div>
    </div>
   </section>

   <section class="py-2 w-full space-y-5 px-4 pt-4">
        <div  @click="goSection(0)" class="h-12 rounded-lg w-full bg-[#f8f8f8] text-[#000] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <img :src="cardpng" alt="filecheck" class="w-6">
            <span class=" tracking-wider text-sm ">绑定银行卡</span>
          </div>
          <img src="@/assets/user/arrow.png" alt="arrow" class="w-5 object-cover">
        </div>
        <div  @click="goSection(1)" class="h-12 rounded-lg w-full bg-[#f8f8f8] text-[#000] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <img :src="usersvg" alt="filecheck" class="w-6">
            <span class=" tracking-wider text-sm">实名认证</span>
          </div>
          <img src="@/assets/user/arrow.png" alt="arrow" class="w-5 object-cover">
        </div>
        <div @click="goSection(2)" class="h-12 rounded-lg w-full bg-[#f8f8f8] text-[#000] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <img :src="password" alt="filecheck" class="w-6">
            <span class=" tracking-wider text-sm">更改密码</span>
          </div>
          <img src="@/assets/user/arrow.png" alt="arrow" class="w-5 object-cover">
        </div>
        <div @click="goSection(3)" class="h-12 rounded-lg w-full bg-[#f8f8f8] text-[#000] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <img :src="addresspng" alt="filecheck" class="w-6">
            <span class=" tracking-wider text-sm">地址簿</span>
          </div>
          <img src="@/assets/user/arrow.png" alt="arrow" class="w-5 object-cover">
        </div>
        <div @click="goSection(4)" class="h-12 rounded-lg w-full bg-[#f8f8f8] text-[#000] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <img :src="comment" alt="filecheck" class="w-6">
            <span class=" tracking-wider text-sm">展示评论区</span>
          </div>
          <img src="@/assets/user/arrow.png" alt="arrow" class="w-5 object-cover">
        </div>
        <div @click="goSection(5)" class="h-12 rounded-lg w-full bg-[#f8f8f8] text-[#000] font-bold flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <img :src="service" alt="filecheck" class="w-6">
            <span class=" tracking-wider text-sm">联系客服</span>
          </div>
          <img src="@/assets/user/arrow.png" alt="arrow" class="w-5 object-cover">
        </div>
       <div class="h-10"></div>
      </section>

  </van-pull-refresh>

  </div>
  <van-dialog
    className="customBackround"
    v-model:show="logoutDialog"
    confirm-button-text="确认"
    cancel-button-text="取消"
    :cancelButtonColor="'#252a3e'"
    :confirm-button-color="'#fe2c2b'"
    show-cancel-button
    @confirm="confirmLogout"
    @cancel="logoutDialog = false"
  >
    <template #title>
      <div>
        提示
      </div>
    </template>
    <p class="text-center py-2 text-black">是否确认退出？</p>
  </van-dialog>
  
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import realname from '@/assets/user/realname.svg'
import withdraw from '@/assets/user/withdraw.svg'
import avatar from "@/assets/avatar.svg";
import usersvg from "@/assets/user/person_check.png"
import personalpng from "@/assets/user/personal.svg"
import cardpng from "@/assets/user/card.png"
import password from "@/assets/user/lock.png"
import addresspng from "@/assets/user/gg.png"
import comment from "@/assets/user/message.png"
import service from "@/assets/user/customer.png"
import { showToast, showLoadingToast, closeToast } from "vant";
import userApi from "@/network/user.js";
import homeApi from "@/network/home.js";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import globaljs from "@/utils/global";

const logoutDialog = ref(false)
const router = useRouter();
const store = useStore();
// const userData = ref(null)
const userInfo = computed(()=> store.getters["app/ProfileInfoData"])
const passInfo = computed(()=> store.getters["app/PasswordInfo"])
const frontImage = ref([]);//
const frontImageUrl = ref("");//
const loading = ref(false)
const questionData = ref(null)

const select_ans = ref(0)
const user_select_ans = ref('')
const submitAns = async () => {
  // console.log(questionData.value)
  if(select_ans.value === 0) return showToast('請選擇答案')  
  let data = { id: questionData?.value?.id, answer_index: select_ans?.value};
  showLoadingToast({
      message: "上传中...",
      forbidClick: true,
      duration: 2000,
    });
  try {
    const res = await homeApi.getAnswer(data);
    showToast(res?.data?.msg);
    console.log('getAnswer ', res)
    if (res?.data?.success && res?.data?.code == 200) {
     // carousalImage.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
}

const goWithdraw = () => {
 if(userInfo.value?.isCanWithdraw == 1) {
  router.push('/withdraw')
 } else {
  console.log('無法提取金額')
  showToast('無法提取金額')
 }
}


const clickAns = (number,answer) => {
  // console.log(questionData.value)
  select_ans.value = number
  user_select_ans.value = answer
}

 const onRefresh = () => {
  getQuestion()
      setTimeout(() => {
        showToast('刷新成功');
      globaljs.getUserInfo();
        loading.value = false;
      }, 1000);
    };

    // const goWithdraw = () => {
    //    if(userInfo.value?.isRealName == 0){ 
    //     showToast("请绑定 实名认证") 

    //     setTimeout(() => {
    //       router.push('/real-name')
    //     }, 1000);
    //   } else {
    //     router.push('/withdraw')
    //   }
    // }

const goSection = (number) => {
 switch (number) {
    case 0:
    // if(userInfo.value?.isBindBank == 0){ 
    //     showToast("请绑定 实名认证") 

    //     setTimeout(() => {
    //       router.push('/real-name')
    //     }, 1000);
    //   }else{
    //     router.push('/bankcard')
    //   }
    router.push('/bankcard')
        break;
    case 1:
    router.push('/real-name')
        break;
    case 2:
    router.push('/changepass')
        break;
    case 3:
    // if(userInfo.value?.isHaveAddeess == 0){ 
    //     showToast("请绑定 实名认证") 

    //     setTimeout(() => {
    //       router.push('/real-name')
    //     }, 1000);
    //   }else{
    //      router.push('/address')
    //   }
    router.push('/address')
        break;

    case 4:
        router.push('/comment');
        break;
    // case 5:
    //     router.push('/accsetting')
    //     break;
    // case 6:
    //     router.push('/chat')
    //     break;
 
    default:
        break;
 }
}

const onOversize = (file) => {
  console.log(file);
  showToast("文件大小不能超过 3MB");
};

const goProfileInfo = () => {
  router.push('/profileinfo')
}

async function frontafterRead(file, detail) {
  console.log(file.file, "frontafterRead");
  try {
    showLoadingToast({
      message: "上传中...",
      forbidClick: true,
      duration: 2000,
    });
    // console.log(imageUrl.value);
    let formData = new FormData();
    formData.append("file", file.file); // 因为要上传多个文件，所以需要遍历一下才行
    console.log(formData, "ddd");
    const res = await userApi.UploadImage(formData);
    frontImage.value = []
     showToast({ message: res?.data?.message, duration: 2000 });
    // console.log(res);
    if (res?.data?.code == '0') {
      
      frontImageUrl.value = res?.data?.data?.url;
    }
    console.log(res, "resssssssss");
  } catch (err) {
    frontImage.value = [];
    showToast("图片上传错误");
    console.log(err, "imageupload error");
  }
}

const logout = ()=> {
 logoutDialog.value = true
}

const confirmLogout = () => {
  window.localStorage.clear("xztt");
  setTimeout(() => {
    window.location.reload();
    router.push("/login");
  }, 500);
}

const getQuestion = async () => {
  let data = { username: userInfo?.value?.name, password: passInfo.value};
    try {
    const res = await homeApi.getQuestion(data);
    console.log(res,"getQuestion ************")
     showToast(res?.data?.msg);
    if (res?.data?.success == true && res?.data?.code == 200) {
      questionData.value = res?.data?.data
    // store.commit("app/PROFILE_USER_INFO", res.data?.data);
    //  userData.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
}
const getAnswer = async () => {
  // let data = { username: userInfo?.value?.name, password: passInfo.value};
  // try {
  //   const res = await homeApi.getAnswer(data);
  //   console.log('getAnswer ', res)
  //   if (res?.data?.success && res?.data?.code == 200) {
  //    // carousalImage.value = res?.data?.data;
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
};

onMounted(() => {
  getQuestion()
  getAnswer()
  globaljs.getUserInfo();
})
</script>


<style >
.bg_ans_sec{
  height: 270px;
  width: 100%;
  background-image: url(@/assets/user/ans.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.van-pull-refresh {
  min-height: calc(100vh - 68px) !important;
  /* overflow-y: auto !important; */
}
</style>