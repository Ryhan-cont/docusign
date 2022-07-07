<template>
    <div :class="['pannel--left-menubar', {'pannel--left-menubar-floating': pannelLayout.floatingLeftMenu}]" :style="{width:`${pannelLayout.leftMenuWidth}px`}" @click="closeHoverLeftMenu">
        <div class="pannel--left-menubar-main" :style="{width:`${pannelLayout.leftMenuWidth}px`}">
            menu
        </div>
    </div>
</template>
 
<script setup>
    import { ref, reactive, onMounted, computed  } from 'vue'


    // import pannelLayoutController from './js/pannelLayoutController.js'
    // const { leftMenuWidth, floatingLeftMenu, headerHeight, leftMenuStat } = pannelLayoutController;

    import { menuData } from './js/menu.js'

    import {usePannelLayoutStore} from '@/store/layout/pannelLayout'
    const pannelLayout = usePannelLayoutStore();

    const closeHoverLeftMenu = (e) => {
        if(e.target.closest('.pannel--left-menubar-main') == null){
            pannelLayout.leftMenuStat = false
        }
    }

    // const selectedMenu = ref('home');
    // const menuItem = reactive([])

    // const menuSelected = (item,index) => {
    //     selectedMenu.value = item
    //     menuItem.length = 0;
    //     menuItem.push(...menuData[index].items);
    //     menu.menuDetail = true;
    //     console.log(menuItem);
    // }
    // onMounted(()=>{
    //     menuItem.push(...menuData[0].items)
    // })
    
</script>