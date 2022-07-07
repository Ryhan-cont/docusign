<template>
    <div :class="['cc-input-box', props.size != '' ? `cc-input-box-${props.size}`: '', {'cc-input-focus':focus}]">
        <slot name="left" />
        <input 
            :class="['cc-input-box-input', {'cc-input-box-input-padding-left':!slots['left']}, {'cc-input-box-input-padding-right':!slots['right']}]" 
            :type="props.inputType"
            :placeholder="props.placeHolder" 
            :value="props.modelValue" 
            @input="updateValue($event.target.value)"
            @focus="focus = true"
            @blur="focus = false"
            :name="name"
        />
        <div class="cc-input-reset" @click="reset" v-if="reset">X</div>
        <slot name="right" />
    </div>
</template>

<script setup>
    import { defineProps, defineEmits, ref, watch , useSlots} from 'vue'
    const props = defineProps({
        modelValue: String | Number,
        placeHolder: String,
        name: String,
        size: {type: String, default:''},
        inputType: {type: String, default:'text'},
        reset: {type: Boolean, default:false}
    })
    const focus = ref(false);
    const emit = defineEmits(['update:modelValue', 'reset']);
    const slots = useSlots();

    const updateValue = (value) => {
        emit('update:modelValue',value)
    };
    const reset = () => {
        emit('update:modelValue','');
        emit('reset','')
    };
</script>