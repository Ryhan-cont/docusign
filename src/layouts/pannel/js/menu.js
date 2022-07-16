
var menuData = [
    {
        name:'Dashboard',
        routeName:'dashboard',
        icon:'Dashboard',
        items:[]
    },
    {
        name:'Pickup Management',
        routeName:'pickupManagement',
        icon:'Pickup',
        items:[]
    },
    {
        name:'Role management',
        icon:'Role',
        show:false,
        items:[
            {
                routeName:'income',
                name:'Income'
            },
            {
                routeName:'forecast',
                name:'Forecast',
            }
        ]
    },
    {
        name:'Admin User',
        icon:'messenger',
        items:[]
    },
    {
        name:'Hubs',
        icon:'folder',
        items:[]
    },

]
export {
    menuData,
}

