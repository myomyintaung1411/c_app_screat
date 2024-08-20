<template>
  <div class="w-full relative pb-10 h-full ">
    <div class="py-4 px-4 relative w-full flex items-center justify-between">
      <div>
        <div class="font-bold text-lg tracking-wider">Alfredo Torres</div>
        <div class="text-[#eabf67] text-base">0.00 USD</div>
        <div class="flex items-center space-x-2 text-sm tracking-wider">
          <van-icon name="bulb-o" size="18" />
          <span>会员级别</span>
        </div>
      </div>

      <div class="pt-3">
        <img :src="avatar" alt="avatar" class="w-18">
      </div>

    </div>
    <section class="py-4  w-full relative">
      <div class="w-full relative  py-2">
          <van-row gutter="10">
            <van-col span="6">
              <div
                @click="goSection(0)"
                class="flex flex-col    text-[12px] text-center  items-center relative"
              >
               <div class="bg-[#0f2a57] h-12 w-12 flex items-center justify-center rounded-full">
                <van-image width="1.5rem" height="1.5rem" :src="cardpng" />
               </div>
                <p class="text-center pt-3 tracking-wider">添加银行  </p>
              </div>
            </van-col>
            <van-col span="6">
              <div
                @click="goSection(1)"
                class="flex flex-col    text-[12px] text-center  items-center relative"
              >
              <div class="bg-[#0f2a57] h-12 w-12 flex items-center justify-center rounded-full">
                <van-image width="1.5rem" height="1.5rem" :src="usersvg" />
               </div>          
                 <p class="text-center pt-3 tracking-wider">真实姓名</p>
              </div>
            </van-col>
            <van-col span="6">
              <div
                @click="goSection(2)"
                class="flex flex-col    text-[12px] text-center  items-center relative"
              >
              <div class="bg-[#0f2a57] h-12 w-12 flex items-center justify-center rounded-full">
                <van-image width="1.5rem" height="1.5rem" :src="password" />
               </div> 
                <p class="text-center pt-3 tracking-wider">更改密码  </p>
              </div>
            </van-col>
            <van-col span="6">
              <div
                @click="goSection(3)"
                class="flex flex-col    text-[12px] text-center  items-center relative"
              >
              <div class="bg-[#0f2a57] h-12 w-12 flex items-center justify-center rounded-full">
                <van-image width="1.5rem" height="1.5rem" :src="personalpng" />
               </div> 
                <p class="text-center pt-3 tracking-wider">地址簿</p>
              </div>
            </van-col>
          </van-row>
        </div>
    </section>
    <section class="py-2 w-full space-y-5 px-4">
        <div class="h-14 rounded-lg w-full bg-[#0f2a57] text-[#febf32] flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <img :src="fileCheck" alt="filecheck" class="w-8">
            <span class=" tracking-wider text-base">任务任务</span>
          </div>
          <van-icon name="arrow" color="#febf32" size="20"  />
        </div>
        <div class="h-14 rounded-lg w-full bg-[#0f2a57] text-[#febf32] flex items-center justify-between px-4 text-base">
          <div class="flex items-center space-x-3">
            <img :src="service" alt="filecheck" class="w-8">
            <span class=" tracking-wider text-base">客户服务</span>
          </div>
          <van-icon name="arrow" color="#febf32" size="20"  />
        </div>

      </section>
  </div>

  
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import realname from '@/assets/user/realname.svg'
import withdraw from '@/assets/user/withdraw.svg'
import avatar from "@/assets/avatar.svg";
import usersvg from "@/assets/user/user.svg"
import personalpng from "@/assets/user/personal.svg"
import cardpng from "@/assets/user/card.svg"
import password from "@/assets/user/password.svg"
import addresspng from "@/assets/user/area.svg"
import fileCheck from "@/assets/user/file-check.svg"
import service from "@/assets/user/service.svg"
import { showToast, showLoadingToast, closeToast } from "vant";
import userApi from "@/network/user.js";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import globaljs from "@/utils/global";

const logoutDialog = ref(false)
const router = useRouter();
const store = useStore();
// const userData = ref(null)
const userInfo = computed(()=> store.getters["app/ProfileInfoData"])
const loginInfo = computed(()=> store.getters["app/LoginData"])
const frontImage = ref([]);//
const frontImageUrl = ref("");//
const loading = ref(false)


 const onRefresh = () => {
      setTimeout(() => {
        showToast('刷新成功');
      globaljs.getUserInfo();
        loading.value = false;
      }, 1000);
    };

    const goWithdraw = () => {
       if(userInfo.value?.isRealName == 0){ 
        showToast("请绑定 实名认证") 

        setTimeout(() => {
          router.push('/real-name')
        }, 1000);
      } else {
        router.push('/withdraw')
      }
    }

const goSection = (number) => {
 switch (number) {
    case 0:
    if(userInfo.value?.isRealName == 0){ 
        showToast("请绑定 实名认证") 

        setTimeout(() => {
          router.push('/real-name')
        }, 1000);
      }else{
        router.push('/bankcard')
      }
        break;
    case 1:
    router.push('/real-name')
        break;
    case 2:
    router.push('/changepass')
        break;
    case 3:
    if(userInfo.value?.isRealName == 0){ 
        showToast("请绑定 实名认证") 

        setTimeout(() => {
          router.push('/real-name')
        }, 1000);
      }else{
         router.push('/address')
      }
        break;
    // case 4:
    //     router.push('/real-name');
    //     break;
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

// const getUserInfo = async () => {
//     try {
//     const res = await userApi.getUserInfo();
//      showToast(res?.data?.msg);
//     if (res?.data?.success == true && res?.data?.code == 200) {
//      store.commit("app/PROFILE_USER_INFO", res.data?.data);
//       userData.value = res?.data?.data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

onMounted(() => {
  globaljs.getUserInfo();
})
</script>


<style>
.van-pull-refresh {
  min-height: calc(100vh - 50px) !important;
  overflow-y: auto !important;
}
</style>