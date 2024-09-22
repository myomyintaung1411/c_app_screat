<template>
  <div class="w-full h-screen relative bg-[#B3000A]">
    <div class="h-12 bg-[#B3000A] text-white w-full flex justify-between items-center px-3 text-base font-bold ">
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">个人资料</div>
      <div class="flex-none"></div>
    </div>
    <div class="w-full  py-2 px-3">
      <div class="flex justify-between items-center my-3 py-3 bg-[#f8f8f8]  rounded-lg shadow  px-5">
        <p class="text-black">头像</p>
        <van-image round width="2.5rem" height="2.5rem" :src="avatar" />
      </div>
      <div class="flex justify-between items-center my-3 py-3 bg-[#f8f8f8]  rounded-lg shadow  text-black px-5">
        <p class="text-black">姓名</p>
        <p>{{userInfo?.name}}</p>
      </div>
      <div @click="goEditPhone" class="flex justify-between items-center my-3 py-3 bg-[#f8f8f8]  rounded-lg shadow  text-black pl-5 pr-2">
        <p class="text-black">手机号</p>
       <div class="flex items-center space-x-3 ">
        <p>{{userInfo?.phone}}</p>
        <van-icon name="arrow" color="#B3000A" size="15"  />
       </div>
      </div>
      <div v-if="userInfo.isRealName === 1" class="flex justify-between items-center my-3 rounded-lg  shadow py-3 bg-white  text-black px-5">
        <p class="text-black">实名</p>
        <p>{{userInfo?.true_name}}</p>
      </div>
      <div class="py-5  relative w-full ">
            <van-button @click="logout"    block class="back_muli "  style=" background:#fe2c2b; border: none;color:#fff;height:48px;">
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
import { ref,computed } from "vue";
import avatar from "@/assets/avatar.svg";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const userInfo = computed(()=> store.getters["app/ProfileInfoData"])
const logoutDialog = ref(false)

const goBack = () => {
    router.push('/user')
}
const goEditPhone = () => {
    router.push('/changephone')
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
</script>


<style scoped>
</style>