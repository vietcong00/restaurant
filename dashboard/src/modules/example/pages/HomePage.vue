<template>
    <el-container>
        <el-header>
            <header-component />
        </el-header>
        <el-container>
            <el-aside>
                <aside-component />
            </el-aside>
            <el-container>
                <el-main>
                    <div
                        class="dashboard-diagram-table"
                        v-show="
                            getIdItemDashBoardSelected == idDashboards.ID_DIAGRAM_TABLE
                        "
                    >
                        <table-diagram :listTable="getTables" />
                    </div>
                    <div
                        class="dashboard-food-table"
                        v-show="getIdItemDashBoardSelected == idDashboards.ID_MENU"
                    >
                        <food-table-layout />
                    </div>
                    <div
                        class="dashboard-booking"
                        v-show="getIdItemDashBoardSelected == idDashboards.ID_BOOKING"
                    >
                        <booking-table />
                    </div>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { productStore } from '../store';
import { ITable } from '../types';
import { NUMBER_PEOPLE, ID_DASHBOARDS } from '../constants';
import CompIcon from '../../../components/CompIcon.vue';

import TableDiagram from '../components/diagramTable/TableDiagram.vue';
import FoodTableLayout from '../components/foodTable/FoodTableLayout.vue';

import BookingTable from '../components/booking/BookingTable.vue';

import AsideComponent from '../components/aside/AsideComponent.vue';
import HeaderComponent from '../components/header/Header.vue';

@Options({
    name: 'home-page-component',
    components: {
        HelloWorld,
        CompIcon,
        TableDiagram,
        AsideComponent,
        HeaderComponent,
        FoodTableLayout,
        BookingTable,
    },
})
export default class HomePage extends Vue {
    numberPeople = NUMBER_PEOPLE;
    idDashboards = ID_DASHBOARDS;

    get getTables(): Array<ITable> {
        return productStore.getTableList;
    }

    get getIdItemDashBoardSelected(): number {
        return productStore.getIdItemDashBoardSelected;
    }

    created(): void {
        productStore.getCategories('');
        productStore.getFoods();
        productStore.getTables();
        productStore.getRestaurants();
        productStore.getBookings();
    }
}
</script>

<style lang="scss" scoped>
.el-container {
    background: #000000;
    .el-footer,
    .el-header {
        background-color: #000000;
        color: var(--el-text-color-primary);
        text-align: center;
        height: 120px !important;
    }
    .el-footer {
        line-height: 60px;
    }
    .el-aside {
        width: 270px !important;
        margin: 0 20px 10px 10px;
        border-radius: 10px;
        background-color: #03833d;
    }

    .el-main {
        background-color: #e9eef3;
        color: var(--el-text-color-primary);
        text-align: center;
    }
}
</style>
