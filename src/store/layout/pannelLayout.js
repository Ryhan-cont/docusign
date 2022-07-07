import { defineStore } from 'pinia'

export const usePannelLayoutStore = defineStore('pannelLayout', {
    state: () => ({
        //Default Settings
        breakPoint : 600,
        leftMenuWidth : 250,
        leftMenuStat : true,
        headerHeight : 80,

        //Adjustable
        leftMenuUserStat : true,
        floatingLeftMenu : false,
        winWidth : 0,
        winHeight : 0,
    }),
    actions: {
        innitialize(){
            document.documentElement.style.setProperty("--leftMenuNegSize", (this.leftMenuWidth * -1) + 'px');
            this.winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            this.winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            if(this.winWidth < this.breakPoint){
                this.floatingLeftMenu = true;
                this.leftMenuStat = false;
            }
        },
        resizeController(){
            this.winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            this.winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            if(this.winWidth < this.breakPoint){
                setTimeout(()=>{
                    this.floatingLeftMenu = true;
                },100)
                
                this.leftMenuStat = false;
            }else{
                this.floatingLeftMenu = false;
                if(this.leftMenuUserStat === true){
                    this.leftMenuStat = true;
                }
            }
        },
        toggleLeftMenu(){
            if(this.leftMenuStat === true){
                if(this.winWidth > this.breakPoint){this.leftMenuUserStat = false;}
                this.leftMenuStat = false;
            }else{
                if(this.winWidth > this.breakPoint){this.leftMenuUserStat = true;}
                this.leftMenuStat = true;
            }
        }
    },
})