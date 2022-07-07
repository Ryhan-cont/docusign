<template>
    <div class="pannel--header" :style="{height:`${pannelLayout.headerHeight}px`}" @click="pannelLayout.toggleLeftMenu">
        header
    </div>
</template>
 
<script setup>
    // import pannelLayoutController from './js/pannelLayoutController.js'
    // const { headerHeight, floatingLeftMenu, testVal, toggleLeftMenu } = pannelLayoutController;
    import {usePannelLayoutStore} from '@/store/layout/pannelLayout'
    const pannelLayout = usePannelLayoutStore();

</script>

<style lang="scss">

</style>