<template>
  <div class="pannel--layout">
    <transition :name="pannelLayout.floatingLeftMenu ? 'fade-left-menu' : 'slide-left-menu'">
      <LeftMenu v-if="pannelLayout.leftMenuStat" />
    </transition>
    <Body>
      <Header />
      <div @click="alert.error()">alert</div>
      <div style="flex:auto;">
          <router-view />
      </div>
    </Body>
  </div>
    
</template>
<script setup>
    import { onBeforeMount, onBeforeUnmount } from 'vue'

    import Header from './Header.vue';
    import LeftMenu from './LeftMenu.vue';
    import Body from './Body.vue';

    import alert from '@/functions/alert'
    import {usePannelLayoutStore} from '@/store/layout/pannelLayout'

    const pannelLayout = usePannelLayoutStore();

    // import pannelLayoutController from './js/pannelLayoutController.js'
    // const { innitialize, resizeController, leftMenuStat, floatingLeftMenu, testVal  } = pannelLayoutController;

    onBeforeMount(()=>{
      pannelLayout.innitialize()
      window.addEventListener('resize', pannelLayout.resizeController);
    })
    onBeforeUnmount(()=>{
      window.removeEventListener('resize', pannelLayout.resizeController);
    })
</script>