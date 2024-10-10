
 <template>
  <div class="w-full h-full relative _bg_main">
    <div
      class="h-12  text-black w-full flex justify-between items-center px-3 text-base font-bold"
    >
      <div @click="goBack" class="">
        <van-icon name="arrow-left" />
      </div>
      <div class="">我的团队</div>
      <div class="flex-none"></div>
    </div>
    <section class="px-2 py-3  h-[calc(100vh_-_48px)] text-center overflow-y-auto  ">
      <van-tabs v-model:active="active" type="card" @click-tab="onClickTab" sticky offset-top="5"  active-color="#E24939" color="#E24939"	>
      <van-tab v-for="tab in tab_" :key="tab.id" :title="tab.name">
        <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      pulling-text="拉动刷新..."
      loosing-text="松动刷新..."
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text=""
        @load="onLoad"
        loading-text="加载中..."
      >
        <div class=" relative w-full  ">
          <div class="py-3 w-full relative px-4">
            <section     v-for="(teamdata) in teamDetailsData" :key="teamdata?.phone" class="bg-white bg-opacity-40 my-2 backdrop-blur-sm rounded py-3 px-3 ">
              <div class="flex items-center justify-between w-full text-xs border-b border-[#a5a5a5] pb-2 ">
                <div class="flex items-center w-[60%] space-x-2">
                  <img src="@/assets/avatar.svg" alt="avatar" class="w-8">
                <div class=" ">
                  <span>昵称：</span>
                  <span> {{teamdata?.name}}</span>
                </div>
                </div>
                <div class="w-[40%] text-right ">
                  <span>昵称：</span>
                  <span> {{formatDate(teamdata?.regist_time)}}</span>
                </div>
              </div>
              <section class="py-2">
                <div v-if="teamdata?.real_name" class="flex items-center py-1 justify-between text-[#333333]">
                  <span>真实姓名</span>
                  <span>{{teamdata?.real_name}}</span>
                </div>
                <div class="flex items-center py-1  justify-between text-[#333333]">
                  <span>个人等级</span>
                  <span>{{teamdata?.level}}</span>
                </div>
                <div class="flex items-center py-1  justify-between text-[#333333]">
                  <span>电话号码</span>
                  <span>{{teamdata?.phone}}</span>
                </div>
              </section>
            </section>
          </div>
        </div>
      </van-list>
        </van-pull-refresh>
       </van-tab>


    </van-tabs>
    </section>
  </div>
          <!-- back to top -->
          <van-back-top  bottom="10vh" style="background:#E24939" />
 </template>



<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showToast, showLoadingToast, closeToast } from "vant";
import homeApi from "@/network/home.js";
import dayjs from 'dayjs'

const router = useRouter();
const route = useRoute()
const teamData = ref(null)
const active = ref(0);

const teamDetailsData = ref([]);

const pageSize = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const tab_ = ref([
  { id: 1, name: '一级成员' },
  { id: 2, name: '二级成员' },
  { id: 3, name: '三级成员' },
])


const goBack = () => {
  router.push("/user");
};

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

function onRefresh() {
  // 清空列表数据
  getTeamMemberNumber()
  teamDetailsData.value = []; //reset data
  currentPage.value = 0; //reset data
  //   totalPage.value = 1; //reset data
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
}

//  const onRefresh = () => {
//       setTimeout(() => {
//         showToast('刷新成功');
//        getTeamMemberNumber()
//         loading.value = false;
//       }, 1000);
//     };

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

const onClickTab = (data) => {
  console.log(data,"clicktab");
  onRefresh()
  
}

const getTeamMemberDetail = async () => {
  let data = {
    level: active.value + 1,
    pageSize: pageSize.value,
    currentPage: currentPage.value,
  };
  console.log(data,"send___________data *********")
  try {
    const res = await homeApi.getTeamMemberDetail(data);
    console.log(res.data)
    if (res?.data?.success == true && res?.data?.code == 200) {
      loading.value = false;
      totalPage.value = res?.data?.data?.count;
      teamDetailsData.value = [
        ...teamDetailsData.value,
        ...res?.data?.data?.record,
      ];
      console.log(res?.data?.data?.count, "total");
      if (teamDetailsData.value?.length >= parseInt(res?.data?.data?.count)) {
        finished.value = true;
      }
      //teamDetailsData.value = res?.data?.data?.record;
    }else{
      loading.value = false
      refreshing.value = false
      finished.value = true
    }
  } catch (error) {
    console.log(error);
  }
};



const onLoad = async () => {
  currentPage.value++;
  if (refreshing.value) {
    teamDetailsData.value = [];
    refreshing.value = false;
  }
  setTimeout(() => {
    getTeamMemberDetail();
  }, 500);
};

const onCallMethod = async () => {
  window.scrollTo(0, 0);
  onRefresh();
};

onMounted(()=> {
  onCallMethod()
  // getTeamMemberNumber()
})

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