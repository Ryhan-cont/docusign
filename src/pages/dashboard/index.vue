<template>
    <PageLayout header="Delivery Management" subHeader="All delivery">
        <div class="d-flex mb-30">
            <Btn class="btn-info">New Delivery</Btn>
            <Btn class="btn-info ml-20">Upload CSV</Btn>
            <Btn class="btn-info ml-20">Dowmload CSV </Btn>
            <div class="flex-auto"></div>
            <Btn class="btn-info">Scan Barcode</Btn>
        </div>
        <div class="d-flex">
            <Btn class="btn-info">Mark All</Btn>
            <div class="px-5 flex-auto">
                <SelectBox />
            </div>
            <div class="px-5 flex-auto">
                <InputBox />
            </div>
            <Btn class="btn-info">Submit</Btn> 
        </div>
        <div class="mb-10">
            Filter Option
        </div>
        <div class="d-grid mb-20" style="grid-template-columns:30px 60px 40px 1fr 1fr 1.5fr">
            <div>Show</div>
            <div class="px-10"><SelectBox /></div>
            <div>entries</div>
            <div class="pl-10"><SelectBox /></div>
            <div class="pl-10"><SelectBox placeholder="Fiter by Hub" :options="options"  show="name" catch="id" v-model="needModalForSelect" /></div>
            <div class="pl-10">
                <InputBox placeholder="Consignment id, Merchant">
                    <template v-slot:left >
                        <div class="d-flex-center pa-5 text-gray-3">
                            Search
                        </div>
                    </template>
                </InputBox>
            </div>
        </div>
        <div>
            <DataTable class="cc-data-table" :headerData="dataTableHeader" :tableData="dataTableData" actionColumn :checkBox="{field:'cb'}" >
                <template v-slot:status={data}>
                    <Btn class="btn-info">{{data.status}}</Btn>
                </template>
            </DataTable>
        </div>

    </PageLayout>
</template> 
<script setup>
    import { onBeforeMount, onBeforeUnmount, ref, reactive, watch  } from 'vue'
    import PageLayout from '@/components/layout/PageLayout.vue'
    import Btn from '@/components/form/Btn.vue'
    import SelectBox from '@/components/form/SelectBox.vue'
    import InputBox from '@/components/form/InputBox.vue'
    import DataTable from '@/components/table/DataTable.vue'
    var dt = []
    for(var i=1; i<100; i++){
        dt.push({
            id: i,
            name: 'xxx - '+i
        })
    }
    const needModalForSelect = ref()
    const options = reactive(dt)
    const dataTableHeader = reactive([
        {
            title:'CB',
            field:'cb',
            style:{maxWidth:'50px'}
        },
        {
            title:'CONSIGNMENT ID',
            field:'name',
            style:{maxWidth:'2000px'},
            sort:'asc'
        },
        {
            title:'Buiness OWNER INFO',
            field:'address.0.present',
            style:{maxWidth:'300px'}
        },
        {
            title:'MERCHANT ORDER ID',
            field:'id',
            slotName:'action',
            style:{maxWidth:'50px'}
        },
        {
            title:'RECIPIENT INFO',
            field:'id',
            style:{maxWidth:'50px'}
        },
        {
            title:'ZONE NAME',
            field:'name',
            style:{maxWidth:'2000px'},
            sort:'asc'
        },
        {
            title:'STATUS',
            field:'status',
            style:{maxWidth:'300px'}
        },
        {
            title:'DELIVERED DATE',
            field:'id',
            slotName:'action',
            style:{maxWidth:'50px'}
        },
        {
            title:'Returned DATE',
            field:'id',
            slotName:'action',
            style:{maxWidth:'50px'}
        },
    ])
    const dataTableData = reactive([
        {
            id:1,
            name:'Abdul Malek',
            address:[{
                present:'',
                permanent:''
            }],
            status:'Delivered',
            cb:true
        },
        {
            id:2,
            name:'Abdul Khalek',
            address:[{
                present:'xxxx',
                permanent:''
            }],
            status:'Pending',
            cb:false
        },
        
    ])
</script>

