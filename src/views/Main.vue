<template>
  <div id="main"
    
    class="w-full h-full sm:max-w-md sm:mx-auto sm:flex sm:justify-center sm:items-center relative"
  >
  <div class="relative  h-[calc(100vh_-_68px)]  w-full main  ">

      <router-view></router-view>

    <!-- <div v-else>
      <NoInterNet></NoInterNet>
    </div> -->

    <van-tabbar
      :border="false"
      route
      v-model="active"
      active-color="#fff"
      inactive-color="#F2BE22"
    >
      <van-tabbar-item to="/home">
        <span>主页</span>
        <template #icon="props">
          <img :src="props.active ? home.active : home.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/user">
        <span>轮廓</span>
        <template #icon="props">
          <img :src="props.active ? user.active : user.inactive" />
        </template>
      </van-tabbar-item>

      <!-- <van-tabbar-item to="/team">
        <span>团队</span>
        <template #icon="props">
          <img :src="props.active ? team.active : team.inactive" />  
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        <span>设置</span>
        <template #icon="props">
          <img :src="props.active ? user.active : user.inactive" />
        </template>
      </van-tabbar-item> -->
    </van-tabbar>
    <!-- <section class="fixed left-0 bottom-0 z-50 h-[68px] flex w-full sm:max-w-md sm:relative border-none  bg-[#050a30]  ">
      <div class="w-full  h-full flex items-center px-12 border-none ">
        <div class=" flex items-center w-full  py-2 px-3 mx-auto my-2 bg-[#0f2a57] rounded-full space-x-3  " >
          <div @click="TabClick(1)" class=" flex items-center space-x-2 flex-1 py-1 rounded-full pl-3" :class="activeRoute === '/home' ? 'bg-[#febf32] text-white animate-fadeleft' : 'text-[#febf32]'">
            <img v-if="activeRoute === '/home'" src="@/assets/home/homea.svg" alt="home" class="w-8">
            <img v-else src="@/assets/home/home.svg" alt="home" class="w-8">
            <span class="pl-2 text-lg">主页</span>
          </div>
          <div @click="TabClick(2)" class="flex items-center flex-1  space-x-2 py-1 rounded-full pl-3 " :class="activeRoute === '/user' ? 'bg-[#febf32] text-white animate-fadeleft' : 'text-[#febf32]'">
            <img v-if="activeRoute === '/user'" src="@/assets/home/usera.svg" alt="home" class="w-8">
            <img v-else src="@/assets/home/user.svg" alt="home" class="w-8">
            <span class="text-lg">轮廓</span>
          </div>
        </div>
    </div>
    </section> -->
    </div>
  </div>
</template>

<script setup>
import homeactive from "@/assets/home/homea.svg";
import homepng from "@/assets/home/home.svg";
import redenvelopeactive from "@/assets/home/redenvelopea.svg";
import redenvelope from "@/assets/home/redenvelope.svg";
import teamactive from "@/assets/home/Teama.svg";
import teampng from "@/assets/home/Team.svg";
import useractive from "@/assets/home/usera.svg";
import userpng from "@/assets/home/user.svg";
import { onMounted, ref, watch,computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const activeRoute = ref("");
const active = ref(0);
const wsService = ref(null); // websocket

const activeTab = ref(1);

watch(
    () => route.path,
    () => {
        console.log(route.path, "watching");
        activeRoute.value = route.path;
    },
    { immediate: true, deep: true }
);

const TabClick = (n) =>{
    console.log(n);
    activeTab.value = n
    switch (n) {
        case 1:
            router.push('/home')
            break;
        case 2:
            router.push('/user')
            break;
        default:
            break;
    }
}

const home = {
  active: homeactive,
  inactive: homepng,
};
const envelope = {
  active: redenvelopeactive,
  inactive: redenvelope,
};
const team = {
  active: teamactive,
  inactive: teampng,
};
const user = {
  active: useractive,
  inactive: userpng,
};
</script>

<style scoped>
/* #main :deep() .van-tabbar {
    background-color: #2A2F4F;
}
.van-tabbar-item--active{
background-color: transparent;
} */

#main :deep() .van-tabbar {
  /* background: #4286f5; */
  background: #fd3130;
  line-height: 0;
}
.van-tabbar-item--active {
  background-color: transparent;
}

.main {
  @apply overflow-y-scroll sm:overflow-y-visible
}

</style>