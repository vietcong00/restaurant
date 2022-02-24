<template>
    <div class="header-options-table">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="getTotalProduct"
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
    <div class="product-table-data">
        <el-table :data="getProductList" border @sort-change="handleSort">
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
                label="Tên sản phẩm"
                width="150"
                class="test"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="product__table__name">
                        {{ scope.row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="Giá"
                width="120"
                class="test"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="product__table__price">
                        {{ scope.row.price }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="descriptions"
                label="Mô tả sản phẩm"
                width="330"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="product__table__descriptions">
                        {{ scope.row.descriptions }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="idCategory" label="Danh mục" width="200">
                <template #default="scope">
                    <div class="product__table__category">
                        {{ scope.row.category.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="id" label="Thao tác" width="150">
                <template #default="scope">
                    <div class="product__table__action">
                        <div class="product-edit" @click="editProduct(scope.row.id)">
                            <comp-icon :iconName="'edit-icon'" />
                        </div>
                        <div class="product-delete">
                            <el-popconfirm
                                confirm-button-text="Yes"
                                cancel-button-text="No"
                                icon-color="red"
                                title="Are you sure to delete this?"
                                @confirm="confirmDelete(scope.row.id)"
                            >
                                <template #reference>
                                    <div>
                                        <comp-icon :iconName="'delete-icon'" />
                                    </div>
                                </template>
                            </el-popconfirm>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {
    EDIT_MODAL_KEYWORD,
    ORDER_BY_DEFAULT,
    PAGE_SIZE_DEFAULT,
    PAGE_SIZE_OPTIONS,
    PRODUCT_SELECTED_DEFAULT,
} from '../../constants';
import { ICategory, IPageObject, IProduct, ITextItem } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { productStore } from '../../store';

@Options({
    name: 'product-table-component',
    components: {
        CompIcon,
    },
})
export default class ProductTable extends Vue {
    pageSizes = PAGE_SIZE_OPTIONS;
    pageSizeSelected = PAGE_SIZE_DEFAULT.name;

    selectPageSize(textItem: ITextItem): void {
        this.pageSizeSelected = textItem.name;
        productStore.setPageSize(textItem.number);
    }

    listCategory: ICategory[] = [];

    get getProductList(): IProduct[] {
        return productStore.getProductList;
    }

    get getCategoryList(): ICategory[] {
        this.listCategory = productStore.getCategoryList;
        return this.listCategory;
    }

    get getTotalProduct(): number {
        return productStore.getTotalProduct;
    }

    get getPageInfo(): IPageObject {
        return productStore.getPageInfo;
    }

    changePage(pageNumber: number): void {
        productStore.setPageInfoProperty({ name: 'page', data: pageNumber });
    }

    editProduct(idProduct: number): void {
        productStore.setTypeModal(EDIT_MODAL_KEYWORD);
        let product = productStore.getProductList.find((el) => el.id === idProduct);
        product = product ?? { ...PRODUCT_SELECTED_DEFAULT };
        productStore.setProductSelected(product);
    }

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
        productStore.getProducts();
    }
}
</script>

<style lang="scss" scoped>
.header-options-table {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
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
.product-table-data {
    width: 1002px;
    margin: 10px auto;
    .product__table__action {
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
        .product-edit:hover {
            color: green;
            border: 2px solid rgb(3, 180, 3);
        }
        .product-delete:hover {
            color: red;
            border: 2px solid rgb(235, 0, 0);
        }
    }
}
</style>
