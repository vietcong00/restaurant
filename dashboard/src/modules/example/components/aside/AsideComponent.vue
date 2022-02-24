<template>
    <div class="logo-aside">
        <img class="logo-img" src="../../../../assets/images/door.png" />
        <div class="logo-title">GR2</div>
    </div>
    <list-dashboard :listDashboard="dashboards" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CompIcon from '../../../../components/CompIcon.vue';
import { DASHBOARDS } from '../../constants';
import ListDashboard from './ListDashboard.vue';

@Options({
    name: 'aside-component',
    components: {
        CompIcon,
        ListDashboard,
    },
    props: {
        listTable: {
            type: Array,
        },
    },
})
export default class ProductTable extends Vue {
    dashboards = DASHBOARDS;
}
</script>

<style lang="scss" scoped>
.logo-aside {
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 10px;
    border-bottom: 1px solid #000000;
    .logo-img {
        width: 50px;
        height: 50px;
        margin: 0 20px;
    }
}
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
