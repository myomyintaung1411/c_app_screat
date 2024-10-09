<template>
  <div class="w-full h-screen relative bg_img ">
    <div
      class="h-12  w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">我的邀请码</div>
      <div class="flex-none"></div>
    </div>

    <section class="py-3 px-10 pt-5 ">
      <!-- <div class="flex items-center justify-center flex-col">
        <img src="@/assets/logo.png" alt="" class="w-20" />
        <span class="pt-2 tracking-wider">扫描下方二维码下载应用</span>
      </div> -->
      <div
        class="px-10 py-6  flex items-center justify-center flex-col    w-full "
      >
        <div class="flex text-white flex-col justify-center items-center">
          <div >
            <vue-qr class="h-full w-48 rounded " v-bind:text="Global?.share_url + '/register' + '?shareCode=' + loginInfo?.invitation_code"  :margin="20" />
          </div>
          <div class="pt-5 w-full">
                    <div class="py-2 text-white text-center tracking-widest font-bold text-base flex items-center w-full justify-center">
                        <p class="">邀请码:</p>
                        <p class="">{{loginInfo?.invitation_code}}</p>
                    </div>
                    <div class="py-2 text-center px-5">
                        <van-button @click="copyAddress" block size="small" class="text-white"  style="color:#fff; background-color:rgba(254,0,0,255);border:none">复制</van-button>
                    </div>

                    <div class="w-full flex flex-col items-center justify-center pt-3">
                      <!-- <img src="@/assets/logo.png" alt="" class="w-28 rounded-full"> -->
                      <p class="text-white font-bold font-mono text-base tracking-wider pt-2">爱满中华</p>
                    </div>
            <!-- <van-button
              @click="onSubmit"  icon="down"
              block
              class="back_muli"
              style="
                background-color:rgba(254,0,0,255);
                border: none;
                color: #fff;
                height: 44px;
              "
            >
              下载app
            </van-button> -->
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

const router = useRouter();
const store = useStore();
const { toClipboard } = useClipboard()

const host = ref(null)
const loginInfo = computed(()=> store.getters["app/LoginData"])

const goBack = () => {
  router.push("/user");
};

const onSubmit = () => {

}

const copyAddress = async () => {
    //let copydata = host.value + '/register' + '?shareCode=' + loginInfo?.value?.invitation_code
    let copydata = Global?.share_url + '/register' + '?shareCode=' + loginInfo?.value?.invitation_code
    try {
        await toClipboard(copydata)
        return showToast ('复制成功')
    } catch (e) {
        showToast('复制错误')
        console.error(e)
    }
}

const Global = xxy; // call unknow.js object as global

// onMounted(()=>{
//     host.value = 'https://dlapp.sxh0011.top' // window?.location?.origin
// })
</script>


<style scoped>
.bg_img{
  /* background-image: url(@/assets/share.jpg); */
  background-size: 100% 100%;
  background-repeat: no-repeat;

}
</style>