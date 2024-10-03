<template>
  <div class="w-full h-full relative bg-[#B3000A]">
    <div
      class="h-12 bg-[#B3000A] text-white w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">充值</div>
      <div class="flex-none"></div>
    </div>
    <section class="px-5 py-3 bg-[#B3000A] h-[calc(100vh_-_48px)] text-center  ">
      <div class="formSection">
        <form @click.prevent>
          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">支付方式</div>
          <div
            class="w-full border h-14 px-3 flex items-center relative rounded-lg  white_color mt-1"
          >
          <van-radio-group v-model="recharge_type" direction="horizontal">
            <van-radio :name="1" checked-color="#FF4855">扫码</van-radio>
            <van-radio :name="2" checked-color="#FF4855">银行卡</van-radio>
          </van-radio-group>

          </div>

          <div class="text_color font-bold text-sm tracking-wider text-left pl-1 mt-5">充值金额</div>
          <div
            class="w-full flex items-center relative rounded-lg h-14 bg-white   mt-1"
          >
          <div
              class=" w-full h-full text-sm flex justify-center items-center relative"
            >
              <input
                v-model="amount"
                autocomplete="off"
                placeholder="请输入充值金额"
                class="input-name text-[#000] bg-transparent px-3 border-none outline-none focus:outline-none focus:border-none w-full h-full placeholder:text-gray-400 placeholder:tracking-widest"
                min="6"
                max="17"
                maxlength="17"
                type="tel"
              />
            </div>
          </div>

          <div class="mt-8">
            <van-button
              @click="reCharge"
              block
              :loading="loading"  :disabled="loading"
              class="back_muli"
              style="
                background-color: #FF4855;
                border: none;
                color: #fff;
                height: 50px;
              "
             >
            提交
            </van-button>
          </div>
        </form>
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
import globaljs from "@/utils/global";
import userApi from "@/network/user.js";

const router = useRouter();
const route = useRoute()
const store = useStore();
const frontImage = ref([]);
const frontImageUrl = ref("");
const loading = ref(false)
const noticeList = ref(null);
const task_content_data = ref(null)
const select_item = ref(null)
const upload_dialog = ref(false)
const BaseImageUrl = computed(() => store.getters["app/BaseImageUrl"]);
const recharge_type = ref(1)
const amount = ref('')
const goBack = () => {
router.push("/home");
};


const reCharge = async () => {
  // console.log(itemId,"jafa")
  if(amount.value == '') return showToast('请输入充值金额')
  if(amount.value < 300) return showToast('充值金额至少300')
  loading.value = true
  showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
  });
   // Extract the number using regex
  //  let numberOnly = itemId?.match(/(\d+)/)?.[0] || null;
  let data = { pay_type:recharge_type.value,amount:amount.value};
  try {
    const res = await userApi.Recharge(data);
    showToast({ message: res?.data?.msg, duration: 2000 });
    console.log('Recharge ', res)
    loading.value = false
    if (res?.data?.success && res?.data?.code == 200) {
     // upload_dialog.value = false
     router.push({ name: 'Pay', query: { info: JSON.stringify(res?.data?.data)  } })

     // carousalImage.value = res?.data?.data;
    }
  } catch (error) {
    loading.value = false
    console.log(error);
  }
}




onMounted(() => {

    if(route.query.task_content && route.query.select_item){
       select_item.value = route.query.select_item
        task_content_data.value = JSON.parse(route.query.task_content)
  }
});


</script>


<style scoped >
#payqrPage :deep() .van-nav-bar__title {
color:#fff !important
}
#payqrPage :deep() .van-nav-bar .van-icon {
color:#fff !important

}
</style>