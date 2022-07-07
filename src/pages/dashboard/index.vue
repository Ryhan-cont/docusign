<template>
    <div>
        Dashboard
        <div @click="reqGet()">get</div>
        <div>
            <InputBox v-model="chk" size="sm" reset @reset="reqGet" name="xxx" >
                <!-- <template v-slot:left>xxxx</template>
                <template v-slot:right>xxxx</template> -->
            </InputBox>

            <SelectBox v-model="chk" size="sm" reset @reset="reqGet" name="xxx" :options="optionsx" style="width:200px" >

            </SelectBox>
        
        
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios'
    import { onBeforeMount, onBeforeUnmount, ref, reactive, watch  } from 'vue'
    import alert from '@/functions/alert'

    import InputBox from '@/components/form/InputBox.vue'
    import SelectBox from '@/components/form/SelectBox.vue'

    


    const chk = ref('xxx');
    const options = reactive([
        {
            name:'xxx',
            id:1
        },
        {
            name:'yyy',
            id:2
        }
    ])
    const optionsx = reactive(['xxx','yyy'])

    const reqGet = () => {
        //    let xx = axios.get('https://reqxres.in/api/users/2');
        //    console.log(xx)

        //alert.error({title: 'Auto close alert!',text: 'Modal with a custom image.',timer: false})
        console.log('chk.value',chk.value)
    }

    watch(chk, () => {
        console.log('xxxx', chk.value)
    })



</script>

