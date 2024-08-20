<template>
  <div class="w-full h-full relative">
    <div
      class="h-12 tab_color w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">我的推广</div>
      <div class="flex-none"></div>
    </div>
    
     <section class="bg_promotion">
        <div class="absolute w-[80%] left-[10%] text-center bottom-[5vh]">
            <!-- <div class=" flex flex-col justify-center items-center">
              <div class="flex items-center text-black bg-red-300">
                <span>邀请码 :</span>
                <span>{{loginInfo?.invitation_code}}</span>
              </div>
                <div class="bg-gray-100 rounded-lg p-3">
                    <vue-qr class="h-full w-56 rounded" v-bind:text="host + '/register' + '?shareCode=' + loginInfo?.invitation_code"  :margin="20" />
                </div>
            </div> -->
                  <div class="flex  text-white flex-col justify-center items-center">
                   <div class="bg-gray-100 rounded-lg p-3">
                    <vue-qr class="h-full w-56 rounded" v-bind:text="host + '/register' + '?shareCode=' + loginInfo?.invitation_code"  :margin="20" />
                </div>
                        <!-- <div class="leading-[44px] ">{{t('invite_friends')}}</div>
                      <p class="text-xl">{{user_info?.invite_code}}</p>  -->
                    </div> 
                    <div class="py-2 text-black text-center tracking-widest font-bold text-base flex items-center w-full justify-center">
                        <p class="">邀请码:</p>
                        <p class="text_color">{{loginInfo?.invitation_code}}</p>
                    </div>
                    <div class="py-2 text-center px-10">
                        <van-button @click="copyAddress" block size="small" class="text-white"  style="color:#fff; background-color:#4286f5">复制</van-button>
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
    let copydata = host.value + '/register' + '?shareCode=' + loginInfo?.value?.invitation_code
    try {
        await toClipboard(copydata)
        return showToast ('复制成功')
    } catch (e) {
        showToast('复制错误')
        console.error(e)
    }
}

onMounted(()=>{
    host.value = 'https://dlapp.sxh0011.top' // window?.location?.origin
})
</script>


<style scoped>
.bg_promotion{
    /* background:url(@/assets/promotion.png) no-repeat; */
    height: 700px;
    width:100%;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
}
</style>