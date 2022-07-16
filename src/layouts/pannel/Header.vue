<template>
    <div class="pannel--header" :style="{height:`${pannelLayout.headerHeight}px`}">
        <transition :name="pannelLayout.floatingLeftMenu ? 'fade-left-menu' : 'slide-left-menu'">
            <div class="pannel--header-spacer" v-if="pannelLayout.leftMenuStat && !pannelLayout.floatingLeftMenu" :style="{width:`${pannelLayout.leftMenuWidth}px`}"></div>
        </transition>
        <div class="pannel--header-content" @click="pannelLayout.toggleLeftMenu">
            Toggle Menu
        </div>
    </div>
</template>
 
<script setup>
    import {usePannelLayoutStore} from '@/store/layout/pannelLayout'
    const pannelLayout = usePannelLayoutStore();
</script>