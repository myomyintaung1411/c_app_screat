<template>
  <div class="w-full h-screen relative _bg_main">
    <div class="h-12  text-black w-full flex justify-between items-center px-3 text-base font-bold ">
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">个人资料</div>
      <div class="flex-none"></div>
    </div>
    <div class="w-full  py-2 px-3">
      <div class="flex justify-between items-center my-3 py-3 bg-[#f8f8f8]  rounded-lg shadow  px-5">
        <p class="text-black">头像</p>
        <!-- <van-image round width="2.5rem" height="2.5rem" :src="avatar" /> -->
        <van-uploader   accept="image/*"  v-model="frontImage"   :max-count="1"
              :max-size="10000 * 1024"    @oversize="onOversize"
              :after-read="frontafterRead">
           <van-image round width="2.5rem" height="2.5rem" fit="cover"  :src=" userInfo?.avatar ? userInfo?.avatar : avatar" />
        </van-uploader>
      </div>
      <div class="flex justify-between items-center my-3 py-3 bg-[#f8f8f8]  rounded-lg shadow  text-black px-5">
        <p class="text-black">账号</p>
        <p>{{userInfo?.name}}</p>
      </div>
      <div v-if="userInfo.isRealName === 1" class="flex justify-between items-center my-3 rounded-lg  shadow py-3 bg-white  text-black px-5">
        <p class="text-black">实名</p>
        <p>{{userInfo?.true_name}}</p>
      </div>
      <div @click="editNickname" class="flex justify-between items-center my-3 py-3 bg-[#f8f8f8]  rounded-lg shadow  text-black pl-5 pr-4">
        <p class="text-black">昵称</p>
        <div class="flex items-center space-x-2 ">
        <p>{{userInfo?.nickname ? userInfo?.nickname : '添加昵称'}}</p>
        <van-icon name="arrow" color="#333" size="15"  />
       </div>
      </div>
      <div @click="goEditPhone"  class="flex justify-between items-center my-3 py-3 bg-[#f8f8f8]  rounded-lg shadow  text-black pl-5 pr-4">
        <p class="text-black">手机号</p>
       <div class="flex items-center space-x-3 ">
        <p>{{userInfo?.phone}}</p>
        <van-icon name="arrow" color="#000" size="15"  />
       </div>
      </div>

      <div class="py-5  relative w-full ">
            <van-button @click="logout"    block class="back_muli "  style=" background:#E24939; border: none;color:#fff;height:48px;">
               退出
            </van-button>
    </div>
    </div>
  </div>
  <van-dialog
    className="customBackround"
    v-model:show="logoutDialog"
    confirm-button-text="确认"
    cancel-button-text="取消"
    :cancelButtonColor="'#252a3e'"
    :confirm-button-color="'#E24939'"
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
import { ref,computed,onMounted } from "vue";
import avatar from "@/assets/avatar.svg";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import globaljs from "@/utils/global";
import userApi from "@/network/user.js";
import { showToast, showLoadingToast, closeToast } from "vant";

const router = useRouter();
const store = useStore();
const userInfo = computed(()=> store.getters["app/ProfileInfoData"])
const logoutDialog = ref(false)
const loading = ref(false)
const frontImage = ref([]);
const frontImageUrl = ref("");

onMounted(() => {
  globaljs.getUserInfo()
})

const goBack = () => {
    router.push('/user')
}
const goEditPhone = () => {
    router.push('/changephone')
}

const editNickname = () => {
  router.push('/editnickname')
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

const editAvatar = async () => {
  console.log(frontImageUrl.value);
  if (
    frontImageUrl.value == "" 
  )
    return showToast("请输入完整的信息");


  loading.value = true;
  let data = {
    imgUrl:frontImageUrl.value
  };
  try {
    showLoadingToast({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    const res = await userApi.editAvatar(data);
    loading.value = false;
    showToast({ message: res?.data?.msg, duration: 2000 });
    if (res?.data?.success == true && res?.data?.code == 200) {
      //addAddressDialog.value = false;
      await globaljs.getUserInfo();
      setTimeout(() => {
        frontImageUrl.value = ''
        frontImage.value = []
      }, 500);
    //  router.push("/user");
    }
  } catch (error) {
    loading.value = false;
    closeToast();
    console.log(error);
  }
};

const onOversize = (file) => {
  console.log(file);
  showToast("文件大小不能超过 10MB");
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
    closeToast();
    // console.log(res);
    if (res?.data?.code == "0") {
      frontImageUrl.value = res?.data?.data?.url;
      await editAvatar()
    }
    console.log(res, "resssssssss");
  } catch (err) {
    frontImage.value = [];
    showToast("图片上传错误");
    console.log(err, "imageupload error");
  }
}

</script>


<style scoped>
._bg_main{
  background-image: url(@/assets/auth/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
</style>