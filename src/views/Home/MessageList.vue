<template>
       <div id="message" class="w-full h-screen relative _bg_main overflow-y-auto ">
        <van-nav-bar
       :border="false"
       title="获取个人消息"
       left-arrow
       @click-left="goBack"
       color="#000" 
      style="background: transparent;font-weight:500 !important;color:#000 !important;"
     />
     <section class="">
        <div class="px-3 py-2 w-full relative">
            <div>
                <div v-for="mess in personalMessage" :key="mess?.id"  class="border-b border-[#666] py-2 text-[#333]">
                 <div @click="setMsg(mess)">
                        <p>{{mess?.msg}} </p>
                    <div v-if="mess?.isRead == 0" class="py-1 text-right text-white">
                         <van-tag type="danger">未读</van-tag>
                    </div>
                    <div v-else class="py-1 text-right ">  <van-tag type="success">已读
                    </van-tag></div>
                    </div>
                </div>
            </div>
        </div>
     </section>
     </div>
</template>


<script setup>
import { ref,computed,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { showToast, showLoadingToast, closeToast } from "vant";
import homeApi from "@/network/home.js";

const router = useRouter();
const store = useStore();
const personalMessage = ref(null)
const goBack = () => {
 router.push("/home");
};

const getPersonalMessage = async () => {
  try {
    const res = await homeApi.getPersonalMessage();
    console.log(res,"getPersonalMessage")
    if (res?.data?.success && res?.data?.code == 200) {
      personalMessage.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const setMsg = async (msg) => {
    if(msg?.isRead == 1) return
    let data = {max_id:msg?.id}
    try {
    const res = await homeApi.setPersonalMessage(data);
    showToast({ message: res?.data?.msg, duration: 2000 });
    if (res?.data?.success && res?.data?.code == 200) {
     // personalMessage.value = res?.data?.data;
     getPersonalMessage()
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
    getPersonalMessage()
});

</script>


<style scoped >
#message :deep() .van-nav-bar__title {
   color:#000 !important
}
#message :deep() .van-nav-bar .van-icon {
   color:#000 !important

}

._bg_main{
  background-image: url(@/assets/auth/background.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}
</style>