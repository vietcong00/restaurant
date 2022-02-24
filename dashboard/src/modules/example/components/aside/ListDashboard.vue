<template>
    <div class="list-dashboard">
        <item-dashboard
            v-for="(item, index) in listDashboard"
            :key="index"
            :idItem="item.id"
            :iconName="item.icon"
            :nameItem="item.name"
        />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CompIcon from '../../../../components/CompIcon.vue';
import ItemDashboard from './ItemDashboard.vue';

@Options({
    name: 'aside-component',
    components: {
        CompIcon,
        ItemDashboard,
    },
    props: {
        listDashboard: {
            type: Array,
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
