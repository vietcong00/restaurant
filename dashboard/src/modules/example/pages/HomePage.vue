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
import { ICategory, IFood, IRestaurant, ITable } from '../types';
import { CLOSE_MODAL_KEYWORD, NUMBER_PEOPLE, ID_DASHBOARDS } from '../constants';
import CompIcon from '../../../components/CompIcon.vue';

import FoodMenu from '../components/FoodMenu.vue';
import TableDiagram from '../components/diagramTable/TableDiagram.vue';
import FoodTableLayout from '../components/foodTable/FoodTableLayout.vue';

import BookingTable from '../components/booking/BookingTable.vue';

import AsideComponent from '../components/aside/AsideComponent.vue';
import HeaderComponent from '../components/header/Header.vue';
import { tokenService } from '@/utils/token';

@Options({
    name: 'home-page-component',
    components: {
        HelloWorld,
        CompIcon,
        FoodMenu,
        TableDiagram,
        AsideComponent,
        HeaderComponent,
        FoodTableLayout,
        BookingTable,
    },
})
export default class HomePage extends Vue {
    showModal = true;
    inputSearch = '';
    selectCategory: ICategory = {
        id: '',
        name: '',
    };

    inputSearchShow = '';
    selectCategoryShow = '';
    loading = false;

    numberPeople = NUMBER_PEOPLE;
    nameCustomer = '';
    phone = '';

    numberPeopleSelected = '';
    branch = '';

    idDashboards = ID_DASHBOARDS;
    get checkTypeModal(): boolean {
        return productStore.getTypeModal !== CLOSE_MODAL_KEYWORD;
    }

    get getTotalProduct(): number {
        return productStore.getTotalProduct;
    }

    get getNotifyResultSearch(): string {
        return productStore.getNotifyResultSearch;
    }

    get checkIsSearching(): boolean {
        return productStore.checkIsSearching;
    }

    get getFoods(): Array<IFood> {
        return productStore.getFoodList;
    }

    get getTables(): Array<ITable> {
        return productStore.getTableList;
    }

    get getRestaurants(): Array<IRestaurant> {
        return productStore.getRestaurantList;
    }

    get getIdItemDashBoardSelected(): number {
        console.log(productStore.getIdItemDashBoardSelected);

        return productStore.getIdItemDashBoardSelected;
    }

    changePeople(number: number): void {
        productStore.setNumberPeople(number);
    }

    changeBranch(number: number): void {
        productStore.setIdRestaurant(number);
        productStore.getTables();
    }

    setCategorySelected(category: ICategory): void {
        this.selectCategory = category;
    }

    book(): void {
        productStore.patchTable({
            status: 'booked',
            nameCustomer: this.nameCustomer,
            phone: this.phone,
            arrivalTime: '2022-02-20 15:36:05',
        });
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
