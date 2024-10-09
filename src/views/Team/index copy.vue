<template>
  <div class="w-full h-full relative pb-12">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <!-- <div
      class="h-12 bg-[rgba(254,0,0,255)] w-full text-center px-3 text-base font-bold leading-[48px]"
    >
      团队
    </div> -->

    <section class="text-black ">
      <div class="bg_team  text-base tracking-wider white_color text-white py-10 border-b border-gray-100 relative">
        <div class="absolute text-center top-3 w-full text-lg  font-bold">团队</div>
        <!-- <p>轮回的缘分</p> -->
        <div class="py-2 text-3xl text_color flex flex-col items-left pl-4 justify-left ">
          <img src="@/assets/group.svg" alt="" class="w-20 absolute right-4 top-12 ">
          <span class="pt-5  text-[#F2BE22] font-bold">团队总人数</span>
          <div class="flex items-center pt-5 text-white font-bold space-x-1 ">
            <p class="  text-4xl ">{{teamData?.all_number}}</p>
            <p class="text-2xl ">人</p>
          </div>
          <!-- <p class="text-[#F2BE22] font-bold text-4xl pt-5">{{teamData?.all_number}} <p class="text-2xl -mt-2">人</p></p> -->
        </div>
      </div>
      <!-- <div class="py-3 px-3 border-b border-gray-100 bg-white ">
        <span class=" tracking-wide text-base text_color">团队总人数:{{teamData?.all_number}}人</span>
      </div> -->
      <div class="w-full px-3 pt-3">

     
      <div @click="goDetail(1)" class="py-4 px-3 rounded-md shadow  bg-white flex justify-between items-center">
        <span class=" tracking-wide text-base text-gray-600 ">一级成员:{{teamData?.level1_number}}人</span>
        <div class="flex items-center space-x-2 text_color">
          <span class=" tracking-wider ">查看</span>
          <van-icon name="arrow"  />
        </div>
      </div>
      <div @click="goDetail(2)"  class="py-4 px-3 mt-3 rounded-md shadow bg-white flex justify-between items-center">
        <span class=" tracking-wide text-base  text-gray-600">二级成员:{{teamData?.level2_number}}人</span>
        <div class="flex items-center space-x-2 text_color">
          <span class=" tracking-wider ">查看</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div @click="goDetail(3)" class="py-4 px-3 mt-3 rounded-md shadow  bg-white flex justify-between items-center">
        <span class=" tracking-wide text-base text-gray-600 ">三级成员:{{teamData?.level3_number}}人</span>
        <div class="flex items-center space-x-2 text_color">
          <span class=" tracking-wider ">查看</span>
          <van-icon name="arrow" />
        </div>
      </div>
       </div>
    </section>
    </van-pull-refresh>
  </div>
</template> 



<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast } from "vant";
import homeApi from "@/network/home.js";

const router = useRouter();
const teamData = ref(null)
const loading = ref(false)


 const onRefresh = () => {
      setTimeout(() => {
        showToast('刷新成功');
       getTeamMemberNumber()
        loading.value = false;
      }, 1000);
    };

const goDetail = (number) => {
   router.push({path:'teamdetails',query:{level:number}})
}

const getTeamMemberNumber = async () => {
    try {
    const res = await homeApi.getTeamMemberNumber();
     //showToast(res?.data?.msg);
    if (res?.data?.success == true && res?.data?.code == 200) {
      teamData.value = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(()=> {
  getTeamMemberNumber()
})

</script>


<style scoped>
.bg_team{
 @apply bg-[#4286f5] rounded-b-3xl
 
/* background: rgb(220,53,53);
background: linear-gradient(360deg, rgba(220,53,53,1) 0%, rgba(229,49,35,1) 35%, rgba(170,15,4,1) 100%); */


}
</style>