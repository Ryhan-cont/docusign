<template>
  <div class="pannel--layout">
    <Header />
    <transition :name="pannelLayout.floatingLeftMenu ? 'fade-left-menu' : 'slide-left-menu'">
      <LeftMenu v-if="pannelLayout.leftMenuStat" />
    </transition>
    <Body>
        <router-view v-slot="{ Component }">
          <transition name="fade-route" mode="out-in">
            <component :is="Component" /> 
          </transition>
        </router-view>
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

    onBeforeMount(()=>{
      pannelLayout.innitialize()
      window.addEventListener('resize', pannelLayout.resizeController);
    })
    onBeforeUnmount(()=>{
      window.removeEventListener('resize', pannelLayout.resizeController);
    })
</script>