<template>
    <div class="data-table--main">
        <div class="data-table--container" ref="containerRef">
            <div class="data-table--y-scroll" :style="{height:`${height}`, minWidth:layout.tableWidth+'px'}" ref="tableYScrollRef">
                <table ref="tableRef">
                    <thead ref="headerRef">
                        <tr>
                            <td v-if="checkBox.field"><input type="checkbox" v-model="headerCheckBox" @change="hederCheckBoxAction()" /></td>
                            <td v-for="(headerItem, HeaderIndex) in headerData" :key="'header-'+HeaderIndex">
                                <div class="d-flex">
                                    <div>
                                        <slot v-if="checkIfSlot(headerItem) != ''" :name="'header-'+checkIfSlot(headerItem)" :data="headerItem" />
                                        <div v-if="!slots['header-'+checkIfSlot(headerItem)]">{{headerItem.title}}</div>
                                    </div>
                                    <div v-if="headerItem.sort">S</div>
                                </div>
                            </td>
                            <td v-if="actionColumn"></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(rowItem, rowInedx) in tableData" :key="'row-'+rowInedx">
                            <td v-if="checkBox.field"><input type="checkbox" v-model="rowItem[checkBox.field]" @change="bodyCheckBox()" /></td>
                            <td v-for="(cellItem, cellIndex) in headerData" :key="'cell-'+cellIndex">
                                <slot v-if="checkIfSlot(cellItem) != ''" :name="checkIfSlot(cellItem)" :data="rowItem" />
                                <div v-if="!slots[checkIfSlot(cellItem)]">{{getData(rowItem, cellItem.field)}}</div>
                            </td>
                            <td class="data-table--cell-action" v-if="actionColumn">...</td>
                        </tr>
                    </tbody>
                </table>
                <div class="data-table--loading" v-if="lazyLoading">Loading...</div>
            </div>
        </div>
        <div class="data-table--scroll">
            <div class="data-table--scroll-head" :style="{height:layout.headerHeight+'px'}"></div>
            <div class="data-table--scroll-bar" :style="{height:(clearNumber(height)-layout.headerHeight)+'px'}" ref="dummyScrollRef">
                <div :style="{height:layout.tableHeight+'px', width:'1px'}"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits, ref, onMounted, computed, useSlots, nextTick, reactive, watch } from 'vue';
    import { cloneDeep, clearNumber } from '@/functions/com.js'
    const props = defineProps({
        headerData: {type: Array, default: () => {return []}},
        tableData: {type: Array, default: () => {return []}},
        checkBox: {type: Object, default: () => {return {}}},
        lazyLoading: {type: Boolean, default: false},
        height: {type:String, default:'auto'},
        actionColumn: {type: Boolean, default: false},
    })
    const slots = useSlots();

    const containerRef = ref();
    const headerRef = ref();
    const tableRef = ref();
    const tableYScrollRef = ref();
    const dummyScrollRef = ref();

    const layout = reactive({
        headerHeight: '',
        tableWidth: '',
        tableHeight: '',
        containerWidth: '',
    })
    const scroll = reactive({
        scrollDiff: 0,
        scrollAdjForDummy:0,
        scrollAdjForMain:0,
        dummyScrollEvent:false,
        mainScrollEvent:false,
    })
    const baseScrollTop = ref(0);
    const dummyScrollTop = ref(0);
    const headerCheckBox = ref(0);

    const checkIfSlot = (data) => {
        if(data.slotName){
            return data.slotName
        }else if(data.field){
            return data.field
        }
        return '';
    }
    const getData = (source, key) => {
        if(key.includes(".")){
            let clonedSource = cloneDeep(source)
            let keyArr = key.split('.');
            for(let item of keyArr){
                if(!clonedSource.hasOwnProperty(item)) {return ''}
                clonedSource = clonedSource[item]
            }
            return clonedSource;
        }else{
            return source[key];
        }
    }
    const hederCheckBoxAction = () => {
        props.tableData.map((item)=>{
            item[props.checkBox.field] = headerCheckBox.value;
        })
    };
    const bodyCheckBox = () => {
        let allTure = true;
        props.tableData.map((item)=>{
            if(item[props.checkBox.field] === false){allTure = null}
        })
        if(allTure === true){headerCheckBox.value = true; return}
        headerCheckBox.value = false;
    }
    const setLayout = () => {
        layout.tableHeight = tableRef.value.offsetHeight;
        tableRef.value.style.width = 'auto';
        layout.tableWidth = tableRef.value.offsetWidth;
        tableRef.value.style.width = '100%';

        layout.headerHeight = headerRef.value.offsetHeight;
        layout.containerWidth = containerRef.value.offsetWidth;

        if(layout.containerWidth<layout.tableWidth){
            setFloatingAction(containerRef.value.offsetWidth-layout.tableWidth);         
        }else{
            setFloatingAction(0);
        }

        let givenHeight = clearNumber(props.height)
        scroll.scrollDiff = (layout.tableHeight - (givenHeight-layout.headerHeight))-(layout.tableHeight - givenHeight)
        scroll.scrollAdjForDummy = scroll.scrollDiff/(layout.tableHeight - givenHeight);
        scroll.scrollAdjForMain = scroll.scrollDiff/(layout.tableHeight - (givenHeight-layout.headerHeight));

        bodyCheckBox()
    }
    const setFloatingAction = (value) => {
        if(!props.actionColumn){return}
        let actionEl = tableRef.value.getElementsByClassName('data-table--cell-action');
        for(let item of actionEl){
            item.style.transform = `translateX(${value}px)`
        }
    }
    const xScroll = (e) => {
        setFloatingAction((containerRef.value.offsetWidth-layout.tableWidth)+e.target.scrollLeft);
    }
    const yScroll = (e) => {
        if(scroll.dummyScrollEvent === true){
            scroll.dummyScrollEvent = false;
            return;
        }
        scroll.mainScrollEvent = true;
        headerRef.value.style.transform = `translateY(${e.target.scrollTop}px)`
        dummyScrollTop.value =  Math.round(e.target.scrollTop + (e.target.scrollTop*scroll.scrollAdjForDummy))
        dummyScrollRef.value.scrollTop = dummyScrollTop.value ;
    }
    const yDummyScroll = (e) => {
        if(scroll.mainScrollEvent === true){
            scroll.mainScrollEvent = false;
            return;
        }
        scroll.dummyScrollEvent = true;
        baseScrollTop.value = Math.round(e.target.scrollTop-(e.target.scrollTop*scroll.scrollAdjForMain));
        headerRef.value.style.transform = `translateY(${baseScrollTop.value}px)`
        tableYScrollRef.value.scrollTop = baseScrollTop.value;
    }
    onMounted(()=>{
        setLayout();
        containerRef.value.addEventListener('scroll', xScroll);
        tableYScrollRef.value.addEventListener('scroll', yScroll);
        dummyScrollRef.value.addEventListener('scroll', yDummyScroll);

        window.addEventListener('resize', setLayout);
    })
    watch(() => ({ ...props.tableData }),() => {
        setLayout();
    })
    watch(() => ({ ...props.headerData }),() => {
        setLayout();
    })
</script>