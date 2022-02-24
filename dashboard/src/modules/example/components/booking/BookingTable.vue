<template>
    <div class="header-options-table">
        <div class="input-search-booking">
            <el-input
                v-model="bookingSearch"
                class="booking-search-input"
                placeholder="Type something"
                @keypress="searchBooking"
            />
        </div>
        <div class="pagination-group">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="getTotalBooking"
                :page-size="getPageInfo.limit"
                :current-page="getPageInfo.page"
                @current-change="changePage"
            >
            </el-pagination>
            <div class="page-size-dropdown">
                <div>
                    <b class="text-dropdown">Show: </b>
                </div>
                <el-dropdown>
                    <div class="el-dropdown-link">
                        <b>{{ pageSizeSelected }}</b>
                        <i
                            class="el-icon-arrow-down el-icon--right"
                            style="margin-left: 10px"
                        ></i>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                v-for="(item, index) in pageSizes"
                                :key="index"
                                @click="selectPageSize(item)"
                                >{{ item.name }}</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
    <div class="booking-table-data">
        <el-table :data="getBookingList" border @sort-change="handleSort" empty-text>
            <el-table-column
                align="center"
                label="#"
                type="index"
                :index="indexMethod"
                width="50"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="Tên khách hàng"
                width="150"
                class="test"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="booking__table__name">
                        {{ scope.row.nameCustomer }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="Điện thoại"
                width="120"
                class="test"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="booking__table__phone">
                        {{ scope.row.phone }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="arrivalTime"
                label="Thời gian tới"
                width="250"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="booking__table__arrival_time">
                        {{ getTime(scope.row.arrivalTime) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="idCategory" label="Số bàn" width="130">
                <template #default="scope">
                    <div class="booking__table__name_table">
                        {{ checkTableNull(scope.row.table) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="idCategory" label="Trạng thái" width="100">
                <template #default="scope">
                    <div class="booking__table__status">
                        {{ scope.row.status }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="id" label="Thao tác" width="200">
                <template #default="scope">
                    <div class="booking__table__action">
                        <div class="booking-done">
                            <el-popconfirm
                                confirm-button-text="Yes"
                                cancel-button-text="No"
                                icon-color="green"
                                title="Bạn có chắc chắn hoàn thành yêu cầu đặt bàn này?"
                                @confirm="changeStatus(scope.row.id, 'Done')"
                            >
                                <template #reference>
                                    <div>
                                        <comp-icon :iconName="'check-icon'" />
                                    </div>
                                </template>
                            </el-popconfirm>
                        </div>
                        <div
                            class="booking-change-table"
                            @click="openModal(scope.row.id)"
                        >
                            <comp-icon :iconName="'dinning-table-small-icon'" />
                        </div>
                        <div class="booking-canceled">
                            <el-popconfirm
                                confirm-button-text="Yes"
                                cancel-button-text="No"
                                icon-color="red"
                                title="Bạn có muốn hủy yêu cầu đặt bàn này không?"
                                @confirm="changeStatus(scope.row.id, 'Canceled')"
                            >
                                <template #reference>
                                    <div>
                                        <comp-icon :iconName="'x-icon'" />
                                    </div>
                                </template>
                            </el-popconfirm>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <modal-chosen-table v-show="checkShowModalChosenTable" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { ORDER_BY_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS } from '../../constants';
import { IBooking, ICategory, IPageObject, ITextItem } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { productStore } from '../../store';
import ModalChosenTable from './ModalChosenTable.vue';

@Options({
    name: 'booking-table-component',
    components: {
        CompIcon,
        ModalChosenTable,
    },
})
export default class BookingTable extends Vue {
    bookingSearch = '';
    pageSizes = PAGE_SIZE_OPTIONS;
    pageSizeSelected = PAGE_SIZE_DEFAULT.name;

    selectPageSize(textItem: ITextItem): void {
        this.pageSizeSelected = textItem.name;
        productStore.setPageSize(textItem.number);
    }

    checkTableNull(table: any): string {
        if (table === null) {
            return 'Chưa chọn bàn';
        }
        return table.name;
    }

    listCategory: ICategory[] = [];

    get checkShowModalChosenTable(): boolean {
        return productStore.checkShowModalChosenTable;
    }

    get getBookingList(): IBooking[] {
        return productStore.getBookingList;
    }

    get getCategoryList(): ICategory[] {
        this.listCategory = productStore.getCategoryList;
        return this.listCategory;
    }

    get getTotalBooking(): number {
        return productStore.getTotalBooking;
    }

    get getPageInfo(): IPageObject {
        return productStore.getPageBookingInfo;
    }

    get getNotifyResultSearch(): string {
        return productStore.getNotifyResultSearch;
    }

    changePage(pageNumber: number): void {
        productStore.setPageInfoProperty({ name: 'page', data: pageNumber });
    }

    openModal(id: number): void {
        productStore.updateIdBookingSelected(id);
        productStore.updateCheckShowModalChosenTable(true);
    }

    // editProduct(idProduct: number): void {
    //     productStore.setTypeModal(EDIT_MODAL_KEYWORD);
    //     let product = productStore.getBookingList.find((el) => el.id === idProduct);
    //     product = product ?? { ...PRODUCT_SELECTED_DEFAULT };
    //     productStore.setProductSelected(product);
    // }

    indexMethod(index: number): number {
        const info = this.getPageInfo;
        return (+info?.page - 1) * +info?.limit + index + 1;
    }

    confirmDelete(idProduct: number): void {
        productStore.deleteProduct(idProduct);
    }

    handleSort(sortData: any): void {
        switch (sortData.order) {
            case 'descending':
                sortData.order = 'DESC';
                break;
            case 'ascending':
                sortData.order = 'ASC';
                break;
            default:
                sortData.order = 'ASC';
        }
        sortData.prop = sortData.prop ?? ORDER_BY_DEFAULT;
        productStore.setPageInfoProperty({ name: 'orderBy', data: sortData.prop });
        productStore.setPageInfoProperty({ name: 'direction', data: sortData.order });
        productStore.getBookings();
    }

    changeStatus(id: number, status: string): void {
        productStore.updateIdBookingSelected(id);
        productStore.patchBooking({
            status: status,
        });
    }

    searchBooking(): void {
        if (this.bookingSearch === '') {
            console.log('ahihi');
            productStore.getBookings();
        } else {
            console.log('ahuhu');

            productStore.searchBooking(this.bookingSearch);
        }
    }

    formatDate(date: Date): string {
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 101).toString().substring(1);
        var day = (date.getDate() + 100).toString().substring(1);
        return month + '/' + day + '/' + year;
    }

    formatTime(date: Date): string {
        var hours = date.getHours().toString();
        var minutes = date.getMinutes().toString();
        var seconds = date.getSeconds().toString();
        return hours + ':' + minutes + ':' + seconds;
    }

    getTime(timeStamp: number): string {
        var date = new Date(timeStamp * 1000);
        var dt = this.formatTime(date) + ' ' + this.formatDate(date);
        return dt;
    }
}
</script>

<style lang="scss" scoped>
.header-options-table {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .input-search-booking {
        width: 200px;
    }
    .pagination-group {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        .page-size-dropdown {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            width: fit-content;
            padding: 8px 10px 8px 22px;
            border: 2px solid #d0d0d0;
            .text-dropdown {
                color: #8c8c8c;
                margin-right: 10px;
            }
        }
    }
}
.booking-table-data {
    width: 1002px;
    margin: 10px auto;
    .booking__table__action {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin: 0 18%;
        :hover {
            border-radius: 5px;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            cursor: pointer;
        }

        .booking-change-table:hover {
            width: 50px;
            border: 2px solid rgb(21, 239, 255);
        }

        .booking-done:hover {
            color: green;
            border: 2px solid rgb(3, 180, 3);
        }

        .booking-canceled:hover {
            color: red;
            border: 2px solid rgb(235, 0, 0);
        }
    }
}
</style>
