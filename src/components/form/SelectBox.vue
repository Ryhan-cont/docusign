<template>
    <div class="cc-select-box-container" ref="mainContainer">
        <div :class="['cc-select-box', props.size != '' ? `cc-select-box-${props.size}`: '', {'cc-input-focus':toggle}]">
            <slot name="left" @click="toggleOptions()" />
            <div 
                :class="['cc-select-box-input', {'cc-select-box-input-padding-left':!slots['left']}, {'cc-select-box-input-padding-right':!slots['right']}]" 
                :placeholder="props.placeHolder" 
                :name="name"
                @click="toggleOptions()"
            >
                <div v-if="aviPreview"></div>
                <div>{{textPreview}}</div>
            </div>
            <div class="cc-input-reset" @click="reset" v-if="reset">X</div>
            <slot name="right" @click="toggleOptions()" />
            <input type="hidden" :value="props.modelValue" :name="name" />
        </div>
        <div v-if="toggle" class="cc-select-box-item-container" ref="optionContainer">
            <div class="cc-select-box-item" v-for="(item, index) in props.options" :key="index" @click="completeSelect(item)">
                <div v-if="validVar(props.aviField)"></div>
                <div>{{validVar(props.show) ? item[props.show] : item}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits, ref, onMounted, computed, useSlots, nextTick } from 'vue';
    import { validVar } from '@/functions/com.js'
    const props = defineProps({
        modelValue: String | Number,
        placeHolder: String,
        name: String,
        size: {type: String, default:''},
        reset: {type: Boolean, default:false},
        options: {type: [Array, Object], default: () => {return []}},
        show: {type: String},
        catch: {type: String},
        aviField: {type: String},
        type: {type: String}
    })
    const optionContainer = ref();
    const mainContainer = ref();
    const interv = ref();
    const monitorPosition = ref();
    const toggle = ref(false);
    const hoverIndex = ref('');
    const emit = defineEmits(['update:modelValue', 'reset']);
    const slots = useSlots();

    const textPreview = computed(() => {
        if(validVar(props.catch) && validVar(props.show)){
            let index = props.options.findIndex(x => x[props.catch] === props.modelValue);
            hoverIndex.value = index;
            return props.options[index][props.show]
        }else{
            let index = props.options.findIndex(x => x === props.modelValue);
            hoverIndex.value = index;
            return props.modelValue
        }
    })
    const aviPreview = computed(() => {
        if(props.type != 'avi' || !validVar(props.aviField)){return false}
        let index = props.options.findIndex(x => x[props.catch] === props.modelValue);
        return props.options[index][props.aviField]
    })
    const toggleOptions = async () => {
        if(toggle.value === false){
            toggle.value = true;
            await nextTick();
            let mainContainerEl = mainContainer.value.getBoundingClientRect()
            optionContainer.value.style.left = mainContainerEl.left + 'px';
            optionContainer.value.style.top = (mainContainerEl.top + mainContainerEl.height) + 'px';
            optionContainer.value.style.width = mainContainerEl.width + 'px';
            optionContainer.value.style.opacity = 1;
            monitorPosition.value = mainContainerEl;
            //document.addEventListener('click', closeOptions);
            interv.value = setInterval(()=> {
                let mainContainerEl = mainContainer.value.getBoundingClientRect();
                if(
                    mainContainerEl.left != monitorPosition.value.left ||
                    mainContainerEl.right != monitorPosition.value.right ||
                    mainContainerEl.top != monitorPosition.value.top
                ){
                    console.log('done')
                    closeOptions(1);
                }else{
                    console.log('xxx')
                }
            },100);
            document.addEventListener('click', closeOptions);
        }else{
            closeOptions();
        }
    }
    const closeOptions = (dt) => {
        console.log(dt)
        document.removeEventListener('click', closeOptions);
        clearInterval(interv.value);
        toggle.value = false;
    }
    const completeSelect = (item) => {
        if(validVar(props.catch)){
            emit('update:modelValue', item[props.catch]);
        }else{
            emit('update:modelValue', item);
        }
    }
    const reset = () => {
        emit('update:modelValue','');
        emit('reset','')
    };
</script>