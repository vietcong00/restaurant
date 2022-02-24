<template>
    <div class="main-container">
        <div class="search-options">
            <div class="data-input-search">
                <el-input
                    class="data-input-search-element input-search"
                    v-model="inputSearch"
                    placeholder="Nhập từ khóa..."
                />
                <select-category
                    :categoryProp="selectCategory"
                    @handleSelectCategory="setCategorySelected"
                />
            </div>
            <div class="button-search-options">
                <el-button
                    class="button-option"
                    type="primary"
                    plain
                    round
                    @click="search"
                    :disabled="inputSearch || selectCategory.id ? false : true"
                >
                    <div class="button-option-content">
                        <comp-icon :iconName="'search-icon'" />
                        <div class="text-button">Tìm kiếm</div>
                    </div></el-button
                >
                <el-button
                    class="button-option"
                    type="danger"
                    round
                    @click="createProduct"
                >
                    <div class="button-option-content">
                        <comp-icon :iconName="'create-icon'" />

                        <div class="text-button">Tạo mới</div>
                    </div></el-button
                >
                <el-button class="refresh-btn" circle @click="refreshProduct">
                    <comp-icon :iconName="'refresh-icon'" />
                </el-button>
            </div>
        </div>
        <div class="product-table">
            <div class="notify-result-search">
                <div class="notify-found-wordFilter" v-show="checkIsSearching">
                    <div class="notify-data-search">
                        <comp-icon
                            :iconName="'light-icon'"
                            :class="getTotalProduct ? 'icon-active' : ''"
                        />
                        Kết quả tìm kiếm cho từ khóa:
                        <span class="data-search" v-show="inputSearchShow">
                            "{{ inputSearchShow }}"
                        </span>
                        <span v-show="selectCategoryShow && inputSearchShow">và</span>
                        <span class="data-search" v-show="selectCategoryShow">
                            "{{ selectCategoryShow }}"
                        </span>
                    </div>
                    <div class="notify-data-number">
                        <div class="found-result" v-if="getTotalProduct > 0">
                            Đã tìm thấy
                            <span class="number-result">{{ getTotalProduct }}</span>
                            kết quả tìm kiếm phù hợp.
                        </div>
                        <div class="-not-found-result" v-else>
                            <span class="number-result">Không</span>
                            tìm thấy kết quả tìm kiếm phù hợp.
                        </div>
                    </div>
                </div>
            </div>
            <food-table />
            <modal-form-product
                v-show="checkTypeModal"
                :productProp="getProductSelected"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import FoodTable from './FoodTable.vue';
import ModalFormProduct from './ModalFormProduct.vue';
import { ICategory, IProduct } from '../../types';
import { CLOSE_MODAL_KEYWORD, CREATE_MODAL_KEYWORD } from '../../constants';
import CompIcon from '../../../../components/CompIcon.vue';
import SelectCategory from './SelectCategory.vue';
import { productStore } from '../../store';

@Options({
    name: 'home-page-component',
    components: {
        HelloWorld,
        FoodTable,
        ModalFormProduct,
        CompIcon,
        SelectCategory,
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

    get checkTypeModal(): boolean {
        return productStore.getTypeModal !== CLOSE_MODAL_KEYWORD;
    }

    get getTotalProduct(): number {
        return productStore.getTotalProduct;
    }

    get getNotifyResultSearch(): string {
        return productStore.getNotifyResultSearch;
    }

    get getProductSelected(): IProduct {
        return productStore.getProductSelected;
    }

    get checkIsSearching(): boolean {
        return productStore.checkIsSearching;
    }

    search(): void {
        productStore.setIsSearching(true);
        this.inputSearchShow = this.inputSearch;
        this.selectCategoryShow = this.selectCategory.name;

        productStore.search({
            wordFilter: this.inputSearch,
            idCategory: this.selectCategory.id,
        });
    }

    createProduct(): void {
        productStore.setTypeModal(CREATE_MODAL_KEYWORD);
    }

    refreshProduct(): void {
        productStore.refreshPage();
    }

    setCategorySelected(category: ICategory): void {
        this.selectCategory = category;
    }

    created(): void {
        productStore.getProducts();
        productStore.getCategories('');
    }
}
</script>

<style lang="scss" scoped>
.main-container {
    background-image: url('../../../../assets/images/auth-bg.png');
}
.search-options {
    width: 1002px;
    margin: 10px auto 20px auto;
    padding: 20px 0;
    border: 1px solid #000;
    border-radius: 10px;
    background: #737272;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    .data-input-search {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-bottom: 20px;
        .data-input-search-element {
            width: 25%;
        }
    }
}

.button-search-options {
    .button-option:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    .button-option-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .text-button {
            margin-left: 5px;
        }
    }
    .refresh-btn {
        color: black;
        &:hover {
            color: #009aa5;
        }
    }
}
.notify-data-search {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    .icon-component {
        margin: 0 10px 4px 0;
    }
    .icon-active {
        color: rgb(255, 187, 0);
    }
    .data-search {
        color: red;
        font-size: 20px;
        font-weight: 600;
    }
}

.number-result {
    font-size: 20px;
    font-weight: 600;
}

.product-table {
    width: 1002px;
    margin: 0 auto;
}
</style>
