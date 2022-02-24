<template>
    <img class="img-item" src="../../../../assets/images/table/door.png" />
    <div class="list-table">
        <table-eat
            v-for="(table, index) in listTable"
            :key="index"
            :idTable="table.id"
            :name="table.name"
            :numberSeat="table.numberSeat"
            :status="table.status"
        />
    </div>
    <img class="img-item" src="../../../../assets/images/table/cash-machine.png" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CompIcon from '../../../../components/CompIcon.vue';
import TableEat from './TableEat.vue';

@Options({
    name: 'product-table-component',
    components: {
        CompIcon,
        TableEat,
    },
    props: {
        listTable: {
            type: Array,
        },
        arrivalTimeBooking: {
            type: Number,
            default: 0,
        },
    },
})
export default class ProductTable extends Vue {}
</script>

<style lang="scss" scoped>
.img-item {
    width: 75px;
    height: 75px;
    margin: 20px auto;
}
.list-table {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    border-top: 1px solid #bebebe;
    border-bottom: 1px solid #bebebe;
}
</style>
