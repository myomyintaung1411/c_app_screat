<script setup>
import { ref, computed, watch, onMounted, toRefs, reactive } from "vue";
import NoInterNet from "@/components/NoInternet.vue";
import { useNetwork  } from "@vueuse/core";

// const {
//   isSupported,
//   orientation,
//   angle,
//   lockOrientation,
//   unlockOrientation,
// } = useScreenOrientation()

// lockOrientation('portrait-primary')

const loading = ref(true)
// Get the network information and status
const network = reactive(useNetwork());
const { isOnline, onlineAt } = toRefs(network);

    setTimeout(() => {
      loading.value = false
    }, 1000)

</script>
<template>
  <div  class="w-full h-full relative sm:max-w-md sm:mx-auto   ">
  <div v-if="isOnline">
    <!-- <div v-if="loading" class="w-full h-screen flex flex-col justify-center items-center">
      <div class="spinner"></div>
    </div> -->
    <div v-if="loading" class="w-full h-screen flex flex-col justify-center items-center">
      <div class="dot-spinner">
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
        <div class="dot-spinner__dot"></div>
       </div>
    </div>
    <main v-else>
      <router-view />
    </main>
    </div>
    <div v-else >
      <NoInterNet></NoInterNet>
    </div>
  </div>
</template>

<style>
:root {
  --van-field-label-color	: #000;
  --van-field-input-text-color	: #000;
  --van-field-placeholder-text-color	: #941010;
}
html {
  scroll-behavior: smooth;
}

*:focus {
  outline: none !important;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}


body {
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  font-family: "Open Sans", sans-serif;
  background-color: #ffffff;
  /* background: #f5f5f5; */
/* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23FFFFFF' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23E53123'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");  min-height: 100vh; */
  width: 100%;
  color: #000;
  font-family: PingFang SC, Hiragino Sans GB, Helvetica Neue, Microsoft Yahei, sans-serif, arial;
  user-select: none;
}

@media (min-width: 640px) {
  body {
    background: none;
     position: relative;
  left: 50%;
  transform: translateX(-50%);

  }
}

.tab_color{
  background: #4286f5;
}

.text_color{
  color:#050a30
}

.form_background{
  background: rgb(78, 108, 80);
}
.white_color{
  background:#fff;
}
.button_color{
  background: rgb(139, 172, 170);
}

.confetti {
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: #4286f5;
  animation: confetti 3s ease-in-out infinite;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}
.red_text_{
  color:#4286f5
}

.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
}

@keyframes confetti {
  0% {
    transform: translateY(-30px) rotate(0);
  }
  100% {
    transform: translateY(120vh) rotate(360deg);
  }
}

.login_bg{
  background: #050a30;
  color: #fff;
}

.logo_bg{
  background-image: url(@/assets/loginbg.jpg);
  background-repeat: no-repeat;
  width: 100%;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}

    .blur {
      width: 100%;
      height: 100%;
      backdrop-filter: blur(5px); /* Adjust the blur radius as needed */
      position: absolute;
      top: 0;
      left: 0;
    }



.spinner {
 --size: 30px;
 --first-block-clr: #fd3130;
 --second-block-clr: #febf32;
 --clr: #111;
 width: 100px;
 height: 100px;
 position: relative;
}

.spinner::after,.spinner::before {
 box-sizing: border-box;
 position: absolute;
 content: "";
 width: var(--size);
 height: var(--size);
 top: 50%;
 animation: up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
 left: 50%;
 background: var(--first-block-clr);
}

.spinner::after {
 background: var(--second-block-clr);
 top: calc(50% - var(--size));
 left: calc(50% - var(--size));
 animation: down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes down {
 0%, 100% {
  transform: none;
 }

 25% {
  transform: translateX(100%);
 }

 50% {
  transform: translateX(100%) translateY(100%);
 }

 75% {
  transform: translateY(100%);
 }
}

@keyframes up {
 0%, 100% {
  transform: none;
 }

 25% {
  transform: translateX(-100%);
 }

 50% {
  transform: translateX(-100%) translateY(-100%);
 }

 75% {
  transform: translateY(-100%);
 }
}

/* fade-left-animation.css */
.fade-left-enter-active,
.fade-left-leave-active {
  transition: opacity 0.5s;
}

.fade-left-enter, .fade-left-leave-to /* .fade-left-leave-active in <2.1.8 */ {
  opacity: 0;
}

.dot-spinner {
  --uib-size: 2.8rem;
  --uib-speed: .9s;
  --uib-color: #183153;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: var(--uib-size);
  width: var(--uib-size);
}

.dot-spinner__dot {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}

.dot-spinner__dot::before {
  content: '';
  height: 20%;
  width: 20%;
  border-radius: 50%;
  background-color: var(--uib-color);
  transform: scale(0);
  opacity: 0.5;
  animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
  box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
}

.dot-spinner__dot:nth-child(2) {
  transform: rotate(45deg);
}

.dot-spinner__dot:nth-child(2)::before {
  animation-delay: calc(var(--uib-speed) * -0.875);
}

.dot-spinner__dot:nth-child(3) {
  transform: rotate(90deg);
}

.dot-spinner__dot:nth-child(3)::before {
  animation-delay: calc(var(--uib-speed) * -0.75);
}

.dot-spinner__dot:nth-child(4) {
  transform: rotate(135deg);
}

.dot-spinner__dot:nth-child(4)::before {
  animation-delay: calc(var(--uib-speed) * -0.625);
}

.dot-spinner__dot:nth-child(5) {
  transform: rotate(180deg);
}

.dot-spinner__dot:nth-child(5)::before {
  animation-delay: calc(var(--uib-speed) * -0.5);
}

.dot-spinner__dot:nth-child(6) {
  transform: rotate(225deg);
}

.dot-spinner__dot:nth-child(6)::before {
  animation-delay: calc(var(--uib-speed) * -0.375);
}

.dot-spinner__dot:nth-child(7) {
  transform: rotate(270deg);
}

.dot-spinner__dot:nth-child(7)::before {
  animation-delay: calc(var(--uib-speed) * -0.25);
}

.dot-spinner__dot:nth-child(8) {
  transform: rotate(315deg);
}

.dot-spinner__dot:nth-child(8)::before {
  animation-delay: calc(var(--uib-speed) * -0.125);
}

@keyframes pulse0112 {
  0%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
