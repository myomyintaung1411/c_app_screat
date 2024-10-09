<template>
  <div class="w-full h-screen relative bg_img ">
    <div
      class="h-12  w-full flex justify-between items-center px-3 text-lg font-bold tracking-wider"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">我的邀请码</div>
      <div class="flex-none"></div>
    </div>
    <section class="px-5 text-center loginForm  h-[calc(100vh_-_48px)] overflow-y-auto">
      <div class="flex items-center py-3">
        <div class="h-12  w-full bg-white rounded flex items-center justify-between ">
          <div class="flex-1  rounded h-full flex items-center pl-5">
            推荐码：{{userInfo?.referralCode}}
          </div>
          <van-button @click="copyAddress"   class="text-white"  style="height:48px;color:#fff; background-color:#E24939;border:none">复制</van-button>

        </div>
      </div>
      <div class="flex items-center justify-center h-[calc(100vh_-_120px)] ">
        <div class="bg_qr relative ">
          <!-- <div class="absolute w-full h-full bg-red-200 bg-opacity-15">
            <div class="absolute lef"></div>
          </div> -->
          <div class="h-28 "></div>
          <div class="h-56  mt-10 mx-10">
            <div class="h-full w-full">
             <vue-qr class="h-full w-full rounded bg-cover object-cover " v-bind:text="host?.value + '/register' + '?shareCode=' + userInfo?.referralCode"  :margin="20" />
          </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>


<script setup>
import { ref,onMounted,computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import vueQr from "vue-qr/src/packages/vue-qr.vue";
import { useStore } from "vuex";
import useClipboard from 'vue-clipboard3'
import { showToast,showLoadingToast ,closeToast  } from "vant";
import globaljs from "@/utils/global";

const router = useRouter();
const store = useStore();
const { toClipboard } = useClipboard()

const host = ref(null)
const userInfo = computed(()=> store.getters["app/ProfileInfoData"])

const goBack = () => {
  router.push("/user");
};

onMounted(()=>{
  globaljs.getUserInfo()
})

const copyAddress = async () => {
    //let copydata = host.value + '/register' + '?shareCode=' + userInfo?.value?.invitation_code
    let copydata = host?.value + '/register' + '?shareCode=' + userInfo?.value?.referralCode
    try {
        await toClipboard(copydata)
        return showToast ('复制成功')
    } catch (e) {
        showToast('复制错误')
        console.error(e)
    }
}

//const Global = xxy; // call unknow.js object as global

onMounted(()=>{
    host.value = window?.location?.origin // window?.location?.origin
})
</script>


<style scoped>
.bg_img{
  background-image: url(@/assets/auth/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;

}
.bg_qr{
  height: 450px;
  width: 100%;
  background-image: url(@/assets/qrsection.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow-y: auto
}
</style>